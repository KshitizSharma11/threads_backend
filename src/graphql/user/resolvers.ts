
import UserService,{createUserPayload,getUserTokenPayload}  from "../../services/users";
const queries={
    getUserToken:async (_: any,payload:getUserTokenPayload)=>{
    const token = await UserService.getUserToken(payload);
    return token;
    }
};
const mutations={
    createUser: async (_: any, payload: createUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
      },
};
export const resolvers={queries,mutations};