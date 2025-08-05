import { Injectable } from "@nestjs/common";

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
  }
];

Injectable()
export class ProductsRepository {
    async getAllProducts(): Promise<Product[]> {
      return products;
    }
    getProductById(id: string) {
      return products.find(product => product.id === id);
    }
    createProduct(product: Product) {
      products.push({...product, id: product.name});
      return products;
    }
    deleteProduct(id: string) {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return `No se encontro al producto con id ${id}`;
      products.splice(index, 1);
    }
    updateProduct(id: string, product: Product) {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...product };
      }
    }

}