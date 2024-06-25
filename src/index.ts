import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
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
        }
        `,
resolvers:{
    Query: {
    hello: ()=>'Hi talking from graphql server',
    },
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