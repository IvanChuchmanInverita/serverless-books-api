import { Injectable } from '@nestjs/common';
import { Book } from "./book.model";

@Injectable()
export class BookService {
  async findOneById(uuid: string): Promise<Book> {
    return {
      uuid,
      name: 'SomeBook',
      authorName: 'Some Author',
      releaseDate: Date.now()
    };
  }
}
