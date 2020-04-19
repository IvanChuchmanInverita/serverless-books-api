import { ApiResponseProperty } from "@nestjs/swagger";

export class Book {
    @ApiResponseProperty({
        type: String,
        example: 'efe1671c5836'
    })
    uuid: string;

    @ApiResponseProperty({
        type: String,
        example: 'Alice in Wonderland'
    })
    name:​ string;

    @ApiResponseProperty({
        type: Number,
        example: 1587334050296
    })
    releaseDate: number;

    @ApiResponseProperty({
            type: String,
            example: 'John Doe',
    })
    authorName: string;
}