import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers';

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
        dateScalarMode: 'timestamp'
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};

main();
