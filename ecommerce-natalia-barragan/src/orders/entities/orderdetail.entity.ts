import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "../../products/entities/products.entity";

@Entity({ 
    name: 'ORDERDETAILS',
})

export class OrderDetails {

    /**
     * UUID v4 generado por BD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Debe ser un número con 2 decimales (precision 10,2).
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'order_id'})
    order: Orders;

    @ManyToMany(() => Products)
    @JoinTable({
        name: 'ORDERDETAIL_PRODUCTS',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[];
}

