import { IsOptional } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    image: string;

    @IsOptional()
    price: number;
}