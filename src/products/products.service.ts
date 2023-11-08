import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {Product} from './models/product.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
      ) {}
    
      async findAll(): Promise<Product[]> {
        return this.productRepository.find();
      }

      async findWhereActiveIsTrue(): Promise<Product[]> {
        return this.productRepository.find({ where: { isActive: true } });
      }
    
      async findOne(id: string): Promise<Product> {
        return this.productRepository.findOne({ where: { id } });
      }
    
      async create(Product: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create({
            ...Product,
            id: uuidv4(), // Gere um novo UUID e atribua-o à propriedade id
          });
          return this.productRepository.save(newProduct);
      }
    
      async update(id: string, Product: Partial<Product>): Promise<Product> {
        await this.productRepository.update(id, Product);
        return this.productRepository.findOne({ where: { id } });
      }
    
      async delete(id: string): Promise<void> {
        await this.productRepository.delete(id);
      }

      async desactiveProduct(id: string): Promise<void> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product with ID ${id} not found!');
        }
        product.isActive = false;
        await this.productRepository.save(product);
      }
}
