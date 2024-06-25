import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {prismaClient}  from './lib/db';
async function init() {
    const app = express();
    app.use(express.json());
const PORT = Number(process.env.PORT) || 8000;
//create graphQL server
const gqlServer = new ApolloServer(
    {
        typeDefs:`
        type Query{
            hello:String
        },
        type Mutation{
            createUser(firstName:String!, lastName:String!,password:String!, email:String!) : Boolean
        }
        `,
resolvers:{
    Query: {
    hello: ()=>'Hi talking from graphql server',
    },
    Mutation:{
        createUser:async( _,
            {firstName,lastName,email,password}:
            {firstName:string;lastName:string;email:string;password:string}
            )=>{
                await prismaClient.user.create({
                 data:{   firstName,
                    lastName,
                    email,
                    password,
                    salt:'random_salt'
                },});
                return true;
            }
    }
}
});
await gqlServer.start();
// Specify the path where we'd like to mount our server
app.use('/graphql',  expressMiddleware(gqlServer));
app.get('/',(req,res)=>{
    res.json({message: 'server is up and running'});
});
app.listen(PORT,()=>{console.log(`server is up and running at ${PORT}`);});
    
}
init();