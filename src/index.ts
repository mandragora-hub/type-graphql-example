import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/user/register';
import { LoginResolver } from './modules/user/login'

import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";


const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver],
    });


    const apolloServer = new ApolloServer({ schema, context: ({ req }: any) => ({ req }) });
    await apolloServer.start();

    const app = Express();
    // express - session
    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: "https://studio.apollographql.com",
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
                // httpOnly: true,
                sameSite: 'none',
                secure: true,
                // secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );
    // 

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('Listening on 4000'));
}

main();