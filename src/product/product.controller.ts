import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './models/create-product-dto';
import { UpdateProductDto } from './models/update-product-dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {

    constructor(
        private productService: ProductService
    ) { }

    @Get()
    async all(@Query('page') page: number = 1) {
        return this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: CreateProductDto) {
        return this.productService.create(body);
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.productService.findOne({ id });
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateProductDto
    ) {
        await this.productService.update(id, body);

        return this.productService.findOne({ id });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}
