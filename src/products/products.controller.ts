import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';


@Controller('api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findWhereActiveIsTrue();
    }
    @Post()
    @HttpCode(201)
    async create(@Body() product: Product): Promise<Product> {
        const createdProduct = await this.productsService.create(product);
        console.log(Product);
        return createdProduct;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product): Promise<any> {
        await this.productsService.update(id, product);
        return { message: 'Product updated successfuly' };
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any>{
        const product = await this.productsService.findOne(id);
        console.log(product);

        if(!product) {
            throw new NotFoundException('Product does not exist!');
        }
        await this.productsService.desactiveProduct(id);
        return { message: 'Product desactivated successfully!' };
    }
}
