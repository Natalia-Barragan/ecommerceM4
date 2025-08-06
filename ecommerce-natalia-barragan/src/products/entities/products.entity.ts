import { Categories } from "src/entities/categories.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'PRODUCTS',
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @Column({
        type: 'text',
        default: 'default-image.jpg',
    })
    image: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Categories;
}