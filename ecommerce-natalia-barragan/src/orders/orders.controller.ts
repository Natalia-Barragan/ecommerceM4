import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { AuthGuard } from "src/Auth/guards/auth.guards";

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard)
    createOrder(@Body() order: CreateOrderDto) {
        const { userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.getOrder(id);
    }
}
