import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './entities/products.entity';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }
  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  createProduct() {
    return this.productsRepository.createProduct();
  }

  updateProduct(id: string, product: Partial<Products>) {
    return this.productsRepository.updateProduct(id, product);
  }

  /* deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  } */
}

