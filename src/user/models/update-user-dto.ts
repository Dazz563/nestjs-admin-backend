import { IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    first_name: string;
    @IsOptional()
    last_name: string;
    @IsOptional()
    email: string;
    @IsOptional()
    role_id: number;
}