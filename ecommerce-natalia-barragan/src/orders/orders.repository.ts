import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/orders/entities/orders.entity";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { Products } from "src/products/entities/products.entity";
import { OrderDetails } from "src/orders/entities/orderdetail.entity";
import { ProductRefDto } from "./dto/orders.dto";
@Injectable()
export class OrdersRepository {
    dataSource: any;
  
    constructor(
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ) {}

    async createOrder(userId: string, products: ProductRefDto[]){

        const user = await this.usersRepository.findOneBy({id: userId});
        if (!user) {
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
        }


        const order = new Orders();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(products.map(async (element) => {
            const product = await this.productsRepository.findOneBy({id: element.id});
            if (!product) {
                throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
            }

            await this.productsRepository.update({id: element.id}, {stock: product.stock - 1});

            return product;
            })
        );

        const total = productsArray.reduce((sum, product)=> sum + Number(product.price), 0);

        const orderDetail = new OrderDetails();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailRepository.save(orderDetail);

        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: true,
            },
        });       

    }

    async getOrder(id: string) {
            const order = await this.ordersRepository.findOne({
                where: { id },
                relations: {
                    orderDetails: {
                        products: true,
                    },
                },
            });

            if(!order){
                throw new NotFoundException(`Orden con id ${id} no encontrada`);    
            }
            return order;
        }

    /* async deleteOrder(id: string) {
        const order = await this.ordersRepository.findOneBy({ id });

        if (!order) {
            throw new NotFoundException(`Orden con id ${id} no encontrada`);
        }

        await this.ordersRepository.delete(id);

        const orderDetails = await this.orderDetailRepository.findOne({
            where: { order: { id } },
            relations: { products: true },
        });

        if (orderDetails && orderDetails.products) {
            await Promise.all(orderDetails.products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({id: element.id});
                if (!product) {
                    throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
                }

                await this.productsRepository.update({id: element.id}, {stock: product.stock - 1});
            }));
        }

    } */

        async deleteOrder(id: string) {
    return this.dataSource.transaction(async (trx) => {
      // 1) Cargar la orden con detalles y producto
      const order = await trx.findOne(Orders, {
        where: { id },
        relations: ['details', 'details.product']
        // alternativamente: relations: ['details', 'details.product']
      });
      if (!order) throw new NotFoundException(`Orden con id ${id} no encontrada`);

      // (Opcional) políticas: impedir borrado por estado
      // if (order.status === 'SHIPPED') throw new BadRequestException('No se puede borrar...');

      // 2) Devolver stock
      for (const det of order.details) {
        await trx.increment(Products, { id: det.product.id }, 'stock', det.quantity);
      }

      // 3) Borrar detalles (libera la FK)
      await trx.delete(OrderDetails, { order: { id } });

      // Si tu versión no acepta nested where, usa QueryBuilder:
      // await trx.createQueryBuilder().delete().from(OrderDetails)
      //   .where('orderId = :id', { id }).execute();

      // 4) Borrar la orden
      await trx.delete(Orders, { id });

      return { deleted: true };
    });
  }
}


