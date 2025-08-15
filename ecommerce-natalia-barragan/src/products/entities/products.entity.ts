import { Categories } from "src/categories/categories.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'PRODUCTS',
})
export class Products {

    /**
     * UUID v4 generado por BD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    /**
     *  Debe ser un string de maximo 50 caracteres
     * @example 'Test Product'
     */
    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string;

    /**
     * Debe ser un string de al menos 10 caracteres
     * @example 'Descripcion del producto'
     */
    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    /**
     * Debe ser un numero mayor o igual a 0 
     */  
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    /**
     * Debe ser un numero mayor o igual a 0
     */
    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    /**
     * Debe ser un string 
     */
    @Column({
        type: 'text',
        default: 'default-image.jpg',
    })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Categories;
}