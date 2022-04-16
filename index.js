import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {schema} from "./src/graphql/index.js";
import dotenv from 'dotenv'
import cors from "cors";

async function startApolloServer() {

    // Required logic for integrating with Express
    const app = express();
    app.use(cors());
    dotenv.config();
    app.use(cookieParser());
    //const pubsub = new PubSub();

    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema,
        context: ({req}) => ({req}),
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    });

    // More required logic for integrating with Express
    await server.start();

    server.applyMiddleware({
        app,
        // cors: {
        //     origin: process.env.CLIENT_URL,
        //     credentials: true,
        // },
        path: '/v3/graphql',
    });


    const PORT = process.env.PORT || 5000
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
        });
        console.log('mongo db connected')
    } catch (err) {
        console.log(err)
    }


    // Modified server startup
    //await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    //console.log(`🚀 Server ready at ${process.pid}:${PORT}${server.graphqlPath} - env: ${process.env.NODE_ENV}`);

     //http://localhost:5000/v3/graphql

    httpServer.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))
}

startApolloServer();
