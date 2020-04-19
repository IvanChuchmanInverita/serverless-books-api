import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from "./book.model";
import { BookDto } from "./book.dto";
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
    private readonly books: Book[] = [];

    async create(data: BookDto): Promise<Book> {
        const book = {...data, uuid: uuid() };
        this.books.push(book);

        return book;
    }

    async find(): Promise<Book[]> {
        return this.books;
    }

    async findOne(uuid: string): Promise<Book> {
        const book = this.books.find(b => b.uuid === uuid);
        if (!book) {
            throw new NotFoundException();
        }

        return book;
    }

    async update(uuid: string, data: BookDto): Promise<Book> {
        let book = await this.findOne(uuid);
        const index = this.books.indexOf(book, 0);
        book = {...book, ...data};
        this.books.splice(index, 1, book);

        return book;
    }

    async delete(uuid: string): Promise<void> {
        const book = await this.findOne(uuid);
        const index = this.books.indexOf(book, 0);
        this.books.splice(index, 1);
    }
}
