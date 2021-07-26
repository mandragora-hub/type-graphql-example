import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/user/register';


const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver],
    });


    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();

    const app = Express();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('Listening on 4000'));
}

main();