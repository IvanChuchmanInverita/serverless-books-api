import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { Book } from "./book.model";
import { BookDto } from "./book.dto";
import { v4 as uuid } from 'uuid';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class BookService {
    private documentClient;

    private readonly books: Book[] = [];
    constructor(
        private configService: ConfigService
    ) {
        const TableName = configService.get<string>('BOOKS_TABLE');
        const clientOptions = configService.get<boolean>('IS_OFFLINE', false)
            ? {
                region: 'localhost',
                endpoint: 'http://localhost:8000',
                accessKeyId: 'DEFAULT_ACCESS_KEY',
                secretAccessKey: 'DEFAULT_SECRET'
            } : {};
        this.documentClient = new DynamoDB.DocumentClient({
            ...clientOptions,
            params: { TableName }
        });
    }

    async create(data: BookDto): Promise<Book> {
        const book = {...data, uuid: uuid() };

        return this.documentClient
            .put({ Item: book })
            .promise()
            .then(result => book);
    }

    async find(): Promise<Book[]> {
        return this.documentClient
            .scan()
            .promise()
            .then(result => result.Items);
    }

    async findOne(uuid: string): Promise<Book> {
        const book = await this.documentClient
            .get({ Key: { uuid } })
            .promise()
            .then(result => result.Item);
        if (!book) {
            throw new NotFoundException();
        }

        return book;
    }

    async update(uuid: string, data: BookDto): Promise<Book> {
        const book = await this.findOne(uuid);

        return this.documentClient
            .update({
                Key: { uuid: book.uuid },
                ExpressionAttributeNames: {
                    "#bookName": "name"
                },
                ExpressionAttributeValues: {
                    ':n': data.name,
                    ':rd': data.releaseDate,
                    ':an': data.authorName
                },
                UpdateExpression: 'SET #bookName = :n, releaseDate = :rd, authorName = :an',
                ReturnValues: 'ALL_NEW'
            })
            .promise()
            .then(result => result.Attributes);
    }

    async delete(uuid: string): Promise<void> {
        const book = await this.findOne(uuid);

        await this.documentClient
            .delete({ Key: { uuid: book.uuid } })
            .promise();
    }
}
