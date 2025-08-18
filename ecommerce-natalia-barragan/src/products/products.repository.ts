import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/products.entity";
import { Categories } from "src/categories/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from "src/utils/data.json";


Injectable()
export class ProductsRepository {

  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  
  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    const productsList = products.slice(start, end);
    return productsList;
    }
    async getProductById(id: string) {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) {
        throw new BadRequestException(`No se encontro al producto con id ${id}`);
      }
      return product;
    }
    async createProduct() {
      const categories = await this.categoriesRepository.find();
      await Promise.all(
        data.map(async (element) => {
          const category = categories.find(cat => cat.name === element.category,);
          if (!category) throw new NotFoundException(`La categoria ${element.category} no existe`);
          const product = new Products();
          product.name = element.name;
          product.description = element.description;
          product.price = element.price;
          product.stock = element.stock;
          product.category = category;
          await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
        })
      );
      return 'Productos agregados';
    }
    async updateProduct(id: string, product: Partial<Products>) {
      await this.productsRepository.update(id, product);
      const updatedProduct = await this.productsRepository.findOneBy({ id });
      return updatedProduct;
    }

    async deleteProduct(id: string) {
      const product = await this.productsRepository.findOneBy({ id });
      if (!product) throw new BadRequestException(`No se encontro el producto con id ${id}`);
      return this.productsRepository.delete(id);
    }
}
