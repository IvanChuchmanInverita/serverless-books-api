import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Books API')
        .setDescription('This API provides the possibility to manage books in the library')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    document.servers.push({ url: `/${process.env.STAGE || 'dev'}` });
    SwaggerModule.setup('', app, document);

    app.enableCors();
    await app.listen(3000);
}
bootstrap();
