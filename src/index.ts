import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql/index';
import UserService from './services/users';

async function init() {
    const app = express();
    app.use(express.json());
const PORT = Number(process.env.PORT) || 8000;
 
app.use('/graphql',  expressMiddleware(await createApolloGraphQLServer(),{
    //@ts-ignore
    context: async ({ req }) => {
        const token = req.headers["token"];
        if (!token) {
            console.log('No token provided in headers');
            return {};
        }
        try {
            const user = await UserService.decodeJWTToken(token as string);
            return { user };
        } catch (error) {
            console.log('Token verification failed', error);
            return {};
        }
    } ,
  }));
app.get('/',(req,res)=>{
    res.json({message: 'server is up and running'});
});
app.listen(PORT,()=>{console.log(`server is up and running at ${PORT}`);});
}
init();