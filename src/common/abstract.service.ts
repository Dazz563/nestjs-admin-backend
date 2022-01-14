import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginataed-result';

@Injectable()
export abstract class AbstractService {

    protected constructor(
        protected readonly repository: Repository<any>
    ) { }

    async all(relations: any[] = []): Promise<any[]> {
        return await this.repository.find({ relations });
    }

    async paginate(page: number = 1, relations: any[] = []): Promise<PaginatedResult> {
        const take = 15;

        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });

        return {
            data: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }

    }

    create(data): Promise<any> {
        return this.repository.save(data);
    }

    findOne(condition, relations: any[] = []): Promise<any> {
        return this.repository.findOne(condition, { relations });
    }

    update(id: number, attrs: any): Promise<any> {
        return this.repository.update(id, attrs);
    }

    delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
