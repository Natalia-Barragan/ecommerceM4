import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ProductRefDto } from "./dto/orders.dto";

@Injectable()
export class OrderService{
    constructor(private OrdersRepository: OrdersRepository) {}

    addOrder(userId: string, products: ProductRefDto[]) {
        return this.OrdersRepository.createOrder(userId, products);
    }
    getOrder(id: string) {
        return this.OrdersRepository.getOrder(id);
    }
}