import {prismaClient} from '../lib/db';
import JWT from 'jsonwebtoken';
const JWT_SECRET ="secret";
import {createHmac,randomBytes} from 'node:crypto';
export interface createUserPayload{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
export interface getUserTokenPayload{
email: string;
password: string
}
class UserService{
    public static createUser(payload:createUserPayload){
    const {firstName,lastName,email,password} = payload;
    const salt= randomBytes(32).toString("hex");
    const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');
    return prismaClient.user.create({
        data:{
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt
        }
    });
    }
    private static getUserByEmail(email: string){
       return prismaClient.user.findUnique({where:{email}});
    }
    public static async getUserToken(payload:getUserTokenPayload){
        const {email,password} = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error('user not found');

        const userSalt=user.salt;
        const userPassword = createHmac('sha256',userSalt).update(password).digest('hex');
        
        if (userPassword !== user.password)
        {
            throw new Error('incorrect password');
        }
        const token= JWT.sign({id:user.id,email:user.email},JWT_SECRET);

        return token;
    }
}

export default  UserService;