import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getAllProducts();
  }
  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  createProduct(product: any) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, product: any) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}

