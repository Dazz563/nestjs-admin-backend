import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './models/update-user-dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {
        super(userRepo);
    }

    async paginate(page: number = 1, relations: any[] = []): Promise<any> {
        const { data, meta } = await super.paginate(page, relations);

        return {
            data: data.map(user => {
                const { password, ...data } = user;
                return data;
            }),
            meta
        }

    }


}
