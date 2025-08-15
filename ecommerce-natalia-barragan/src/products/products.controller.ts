import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/Auth/guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Auth/roles.enum';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { UpDateProductDto } from './dtos/products.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if(page && limit) return this.productsService.getProducts(Number(page), Number(limit))
    return this.productsService.getProducts(Number(1), Number(5));
  }
 
  @Get('seeder')
  createProducts() {
    return this.productsService.createProduct();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

/* 
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  addProduct(@Body() product: any) {
    return this.productsService.createProduct();
  } */

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: UpDateProductDto) {
    return this.productsService.updateProduct(id, product);
  }
/*   @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  } */
}


