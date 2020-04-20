import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, Length } from "class-validator";

export class BookDto {
    @Length(5, 100)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        example: 'Alice in Wonderland',
        description: 'Book name'
    })
    name:​ string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        type: Number,
        example: 1587334050,
        description: 'Book release date timestamp'
    })
    releaseDate: number;

    @Length(5, 50)
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        example: 'John Doe',
        description: 'Book author name'
    })
    authorName: string;
}