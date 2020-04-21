import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    HttpCode,
    ParseUUIDPipe,
    ValidationPipe
} from '@nestjs/common';
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { BookDto } from "./book.dto";
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiNoContentResponse,
    ApiBadRequestResponse,
    ApiTags,
    ApiBody,
} from "@nestjs/swagger";

@ApiTags('Books library')
@Controller()
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) {}

    @ApiBadRequestResponse({ description: 'Validation failed' })
    @ApiCreatedResponse({ type: Book })
    @ApiBody({ type: BookDto })
    @Post('book/add')
    async create(
        @Body(new ValidationPipe()) book: BookDto
    ): Promise<Book> {
        return this.bookService.create(book);
    }

    @ApiOkResponse({ type: [Book] })
    @Get('books')
    async list(): Promise<Book[]> {
        return this.bookService.find();
    }

    @ApiBadRequestResponse({ description: 'Validation failed' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOkResponse({ type: Book })
    @Get('book/:bookUuid')
    async get(
        @Param('bookUuid', new ParseUUIDPipe()) uuid: string
    ): Promise<Book> {
        return this.bookService.findOne(uuid);
    }

    @ApiBadRequestResponse({ description: 'Validation failed' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiOkResponse({ type: Book })
    @Post('book/:bookUuid/update')
    @HttpCode(200)
    async update(
        @Param('bookUuid', new ParseUUIDPipe()) uuid: string,
        @Body(new ValidationPipe()) book: BookDto
    ): Promise<Book> {
        return this.bookService.update(uuid, book);
    }

    @ApiBadRequestResponse({ description: 'Validation failed' })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiNoContentResponse({ description: 'Deleted' })
    @Post('book/:bookUuid/delete')
    @HttpCode(204)
    async delete(
        @Param('bookUuid', new ParseUUIDPipe()) uuid: string
    ): Promise<void> {
        return this.bookService.delete(uuid);
    }
}
