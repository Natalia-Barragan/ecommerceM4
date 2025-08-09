import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./entities/products.entity";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from "src/utils/data.json";

type Product = {
    id:string
    name: string
    description: string
    price: number
    stock: boolean
    imgUrl: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Camiseta FC Barcelona 2024/25 (Local)",
    description: "Camiseta oficial del FC Barcelona temporada 2024/25, versión local, con tecnología Dri-FIT y escudo bordado.",
    price: 89.99,
    stock: true,
    imgUrl: "https://example.com/img/barcelona-home-2024.jpg"
  },
  {
    id: "2",
    name: "Camiseta River Plate 2024 (Titular)",
    description: "Camiseta titular de River Plate 2024, diseño clásico con la banda roja cruzada, escudo bordado.",
    price: 79.99,
    stock: true,
    imgUrl: "https://example.com/img/river-2024-home.jpg"
  },
  {
    id: "3",
    name: "Camiseta Boca Juniors 2024 (Alternativa)",
    description: "Camiseta alternativa de Boca Juniors temporada 2024, diseño azul oscuro con detalles dorados.",
    price: 84.50,
    stock: false,
    imgUrl: "https://example.com/img/boca-2024-away.jpg"
  },
  {
    id: "4",
    name: "Camiseta Manchester United 2024/25 (Local)",
    description: "Camiseta local del Manchester United 2024/25 con detalles clásicos rojos y escudo dorado.",
    price: 94.90,
    stock: true,
    imgUrl: "https://example.com/img/manutd-home-2024.jpg"
  },
  {
    id: "5",
    name: "Camiseta Inter Miami 2024 (Titular)",
    description: "Camiseta oficial de Inter Miami 2024, color rosa característico con detalles negros, versión Messi.",
    price: 99.00,
    stock: true,
    imgUrl: "https://example.com/img/intermiami-2024.jpg"
  },
  {
    id: "6",
    name: "Camiseta Argentina 2024 (Copa América)",
    description: "Camiseta oficial de la Selección Argentina edición Copa América 2024, con tres estrellas bordadas.",
    price: 104.99,
    stock: false,
    imgUrl: "https://example.com/img/argentina-2024.jpg"
  },
  {
    id: "7",
    name: "Camiseta Manchester United 2024/25 (Local)",
    description: "Camiseta local del Manchester United 2024/25 con detalles clásicos rojos y escudo dorado.",
    price: 94.90,
    stock: true,
    imgUrl: "https://example.com/img/manutd-home-2024.jpg"
  },
  {
    id: "8",
    name: "Camiseta Inter Miami 2024 (Titular)",
    description: "Camiseta oficial de Inter Miami 2024, color rosa característico con detalles negros, versión Messi.",
    price: 99.00,
    stock: true,
    imgUrl: "https://example.com/img/intermiami-2024.jpg"
  },
  {
    id: "9",
    name: "Camiseta Argentina 2024 (Copa América)",
    description: "Camiseta oficial de la Selección Argentina edición Copa América 2024, con tres estrellas bordadas.",
    price: 104.99,
    stock: false,
    imgUrl: "https://example.com/img/argentina-2024.jpg"
  }
];

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
    const productsList = products.slice(start, end);// el slice tiene en cuenta el primer elemento pero no el ultimo
    return productsList;
    }
    async getProductById(id: string) {
      const product = await this.productsRepository.findOneBy({ id });
      if (!products) {
        return `No se encontro al producto con id ${id}`;
      }
      return product;
    }
    async createProduct() {
      const categories = await this.categoriesRepository.find();
      await Promise.all(
        data.map(async (element) => {
          const category = categories.find(cat => cat.name === element.category,);
          if (!category) throw new Error(`La categoria ${element.category} no existe`);
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
    deleteProduct(id: string) {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return `No se encontro al producto con id ${id}`;
      products.splice(index, 1);
    }
    async updateProduct(id: string, product: Products) {
      await this.productsRepository.update(id, product);
      const updatedProduct = await this.productsRepository.findOneBy({ id });
      return updatedProduct;
    }

}