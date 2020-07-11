import './env.js';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport.js';
import { authenticateJwt } from './passport.js';
import { isAuthenticated } from './middlewares';

const PORT = process.env.PORT || 4000;

/*
const mocks = {
    Query: () => ({
        hello: () => 'Omg good to see you',
        listOfStrings: () => new MockList([2, 6])
    })
}
*/

const server = new GraphQLServer({ 
    schema, 
    context: ({request}) => ({request, isAuthenticated}) 
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt)

server.start({port: PORT}, () => {
    console.log(`server running on http://localhost:${PORT}`);
});

