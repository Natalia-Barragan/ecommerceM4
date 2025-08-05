import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { products } from './products.repository';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
  @Post()
  addProduct(@Body() product: any) {
    return this.productsService.createProduct(product);
  }
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}


( PUT{id}, DELETE{id}).