import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { createConnection } from 'typeorm';

import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createSchema } from './utils/createSchema';


const main = async () => {
    await createConnection();

    const schema = await createSchema();


    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });
    await apolloServer.start();

    const app = Express();
    // express - session
    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: "*",
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                // sameSite: 'none',
                // secure: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );
    // 

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('Listening on 4000'));
}

main();