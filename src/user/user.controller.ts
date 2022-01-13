import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './models/create-user-dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './models/update-user-dto';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get()
    all(@Query('page') page: number = 1): Promise<User[]> {
        // return this.userService.all();
        return this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        const { role_id, ...data } = body;

        return this.userService.create({
            ...data,
            password: password,
            role: { id: body.role_id }
        });
    }

    @Get('/:id')
    async get(@Param('id') id: number) {
        return this.userService.findOne({ id });
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto
    ) {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
