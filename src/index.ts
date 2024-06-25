import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql/index';

async function init() {
    const app = express();
    app.use(express.json());
const PORT = Number(process.env.PORT) || 8000;
 
app.use('/graphql',  expressMiddleware(await createApolloGraphQLServer()));
app.get('/',(req,res)=>{
    res.json({message: 'server is up and running'});
});
app.listen(PORT,()=>{console.log(`server is up and running at ${PORT}`);});
}
init();