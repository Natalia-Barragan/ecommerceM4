import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetail.entity";
import { Users } from "src/users/entities/user.entity";

@Entity({name: 'ORDERS',})
export class Orders {
    /**
     * UUID v4 generado por BD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Fecha en formato dd/mm/yyyy
     * @example '13/08/2025'
     */
    @Column()
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order, {
      cascade: false
    })
    orderDetails: OrderDetails;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;

}