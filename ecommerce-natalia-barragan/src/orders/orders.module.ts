import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "src/orders/entities/orders.entity";
import { OrderDetails } from "src/orders/entities/orderdetail.entity";
import { Users } from "src/users/entities/user.entity";
import { Products } from "src/products/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        Orders,
        OrderDetails,
        Users,    
        Products
    ])],
    controllers: [OrdersController],
    providers: [OrderService, OrdersRepository],
    exports: [OrderService, OrdersRepository],
})
export class OrdersModule {}