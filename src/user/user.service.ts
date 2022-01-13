import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './models/update-user-dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async all(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async paginate(page: number = 1): Promise<any> {
        const take = 15;

        const [users, total] = await this.userRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });

        return {
            data: users.map(user => {
                // removing the password
                const { password, ...data } = user;

                return data;
            }),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }

    }

    create(data): Promise<User> {
        return this.userRepo.save(data);
    }

    findOne(condition): Promise<User> {
        return this.userRepo.findOne(condition);
    }

    async update(id: number, attrs: Partial<UpdateUserDto>) {
        const user = await this.findOne(id);
        // console.log(user);

        if (!user) {
            throw new NotFoundException('user not found');
        }
        const { role_id, ...data } = attrs;

        await this.userRepo.update(id, {
            ...data,
            role: { id: role_id }
        });

        return user;
    }

    delete(id: number): Promise<any> {
        return this.userRepo.delete(id);
    }


}
