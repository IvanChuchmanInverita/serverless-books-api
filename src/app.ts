import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    const options = new DocumentBuilder()
        .setTitle('Books API')
        .setDescription('This API provides the possibility to manage books in the library')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    document.servers.push({ url: `/${process.env.STAGE || 'dev'}` });
    SwaggerModule.setup('', app, document);

    app.enableCors();
    await app.init();
    return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
    if (!cachedServer) {
        const server = await bootstrapServer();
        cachedServer = server;
        return awsServerlessExpress.proxy(server, event, context, 'PROMISE')
            .promise;
    } else {
        return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
            .promise;
    }
};
