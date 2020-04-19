import { Controller, Get, Post, Param, Body, HttpCode } from '@nestjs/common';
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { BookDto } from "./book.dto";
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiTags,
    ApiBody,
} from "@nestjs/swagger";

@ApiTags('Books library')
@Controller()
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) {}

    @ApiCreatedResponse({ type: Book })
    @ApiBody({ type: BookDto })
    @Post('book/add')
    async create(@Body() book: BookDto): Promise<Book> {
        return this.bookService.create(book);
    }

    @ApiOkResponse({ type: [Book] })
    @Get('books')
    async list(): Promise<Book[]> {
        return this.bookService.find();
    }

    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOkResponse({ type: Book })
    @Get('book/:bookUuid')
    async get( @Param('bookUuid') uuid: string ): Promise<Book> {
        return this.bookService.findOne(uuid);
    }

    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOkResponse({ type: Book })
    @Post('book/:bookUuid/update')
    async update(
        @Param('bookUuid') uuid: string,
        @Body() book: BookDto
    ): Promise<Book> {
        return this.bookService.update(uuid, book);
    }

    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiNoContentResponse({ description: 'Deleted' })
    @Post('book/:bookUuid/delete')
    @HttpCode(204)
    async delete( @Param('bookUuid') uuid: string ): Promise<void> {
        await this.bookService.delete(uuid);
    }
}
