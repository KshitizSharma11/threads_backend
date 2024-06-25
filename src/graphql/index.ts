import { ApolloServer } from "@apollo/server";
import {User} from './user';
async function createApolloGraphqlServer() {
    
//create graphQL server
const gqlServer = new ApolloServer(
    {
        typeDefs:`
          type Query  { 
            ${User.queries}
            },
        type Mutation{
            ${User.mutations}
        }
        `,
resolvers:{
    Query: {
    ...User.resolvers.queries
    },
    Mutation:{
        ...User.resolvers.mutations
            }
    }
}
);
await gqlServer.start();
// Specify the path where we'd like to mount our server
return gqlServer;
    
}

export default createApolloGraphqlServer;