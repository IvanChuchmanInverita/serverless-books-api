import { ApiResponseProperty } from "@nestjs/swagger";

export class Book {
    @ApiResponseProperty({
        type: String,
        example: 'fdbf10ce-afb8-43f3-8de5-9a309f6f6d21'
    })
    uuid: string;

    @ApiResponseProperty({
        type: String,
        example: 'Alice in Wonderland'
    })
    name:​ string;

    @ApiResponseProperty({
        type: Number,
        example: 1587334050
    })
    releaseDate: number;

    @ApiResponseProperty({
        type: String,
        example: 'John Doe',
    })
    authorName: string;
}