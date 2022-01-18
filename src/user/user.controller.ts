import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './models/create-user-dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './models/update-user-dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/decorators/has-permission.decorator';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Get()
    @HasPermission('users')
    all(@Query('page') page: number = 1) {
        // return this.userService.all();
        return this.userService.paginate(page, ['role']);
    }

    @Post()
    @HasPermission('users')
    async create(@Body() body: CreateUserDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        const { role_id, ...data } = body;

        return this.userService.create({
            ...data,
            password: password,
            role: { id: role_id }
        });
    }

    @Get('/:id')
    @HasPermission('users')
    @HasPermission('users')
    async get(@Param('id') id: number) {
        return this.userService.findOne({ id }, ['role']);
    }

    @Put('info')
    async updateInfo(
        @Body() body: UpdateUserDto,
        @Req() request: Request
    ) {
        const id = await this.authService.userId(request);
        await this.userService.update(id, body);

        return this.userService.findOne({ id });
    }

    @Put('password')
    @HasPermission('users')
    async updatePassword(
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
        @Req() request: Request
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!')
        }
        const id = await this.authService.userId(request);
        const hashed = await bcrypt.hash('1234', 12);

        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne({ id });
    }

    @Put('/:id')
    @HasPermission('users')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto
    ) {
        return this.userService.update(id, body);
    }

    @Delete('/:id')
    @HasPermission('users')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
