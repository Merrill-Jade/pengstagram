// all flies for graphql server will have the resolvers, and it will be combine in here
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from "path";

// all the graphql files in api folder
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
// all the resolver js files in api folder
// WARNING!! all of js files in api folder must be resolvers; otherwise it will get error
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;