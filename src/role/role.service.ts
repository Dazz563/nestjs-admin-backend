import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>
    ) { }

    async all(): Promise<Role[]> {
        return this.roleRepo.find();
    }

    create(data): Promise<Role> {
        return this.roleRepo.save(data);
    }

    findOne(condition): Promise<Role> {
        return this.roleRepo.findOne(condition, { relations: ['permissions'] });
    }

    async update(id: number, attrs: any) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);

        return this.roleRepo.save(user);
    }

    delete(id: number): Promise<any> {
        return this.roleRepo.delete(id);
    }
}
