import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    createOrder(@Body() order: CreateOrderDto) {
        const { userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @Get(':id')
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.getOrder(id);
    }
}
