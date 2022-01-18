import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstractService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>
    ) {
        super(orderRepo)
    }

    async paginate(page: number = 1): Promise<any> {
        const { data, meta } = await super.paginate(page);

        return {
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta
        }

    }

    async getDailySales() {
        return this.orderRepo.query(`
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m-%d') AS date,
            SUM(i.price * i.quantity) AS total_sales
        FROM orders AS o
        INNER JOIN order_items AS i
            ON o.id = i.order_id
        GROUP BY date;
        `);
    }
}
