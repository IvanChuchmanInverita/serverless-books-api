import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    @ApiProperty({
        type: String,
        example: 'Alice in Wonderland',
        description: 'Book name'
    })
    name:​ string;

    @ApiProperty({
        type: Number,
        example: 1587334050296,
        description: 'Book release date timestamp'
    })
    releaseDate: number;

    @ApiProperty({
        type: String,
        example: 'John Doe',
        description: 'Book author name'
    })
    authorName: string;
}