import { Orders } from "src/orders/entities/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'USERS' })

export class Users {

    /**
     * UUID v4 generado por BD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     *  Debe ser un string de maximo 50 caracteres
     * @example 'Test User'
     */    
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    /**
     * Debe ser un email de formato válido y con un max de 50 caracteres
     * @example 'Test.user@example.com'
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    /**
     * Debe tener al menos una minúscula, una mayúscula, un número y un símbolo
     * @example 'Password123!'
     */
    @Column({
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    password: string;

    /**
     * Debe ser un número
     * @example '54 11 1234 5678'
     */
    @Column({
        type: 'int',
        nullable: true,
    })
    phone: number;

    /**
     * Debe tener entre 5 y 20 caracteres
     * @example 'Argentina!'
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    country: string;
    
    /**
     * Debe tener entre 3 y 80 caracteres
     * @example 'calle falsa 123!'
     */
    @Column({
        type: 'text',
        nullable: true,
    })
    address: string;

    /**
     * Debe tener entre 5 y 20 caracteres
     * @example 'La Plata, Buenos Aires!'
     */
    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    /**
     * Debe ser un booleano
     * @example true
     */   
    @Column({
        default: false,
    })
    isAdmin:boolean;

    
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Orders[];
    
}
 