import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price_in_cents: number;

    @Column({ default: true })
    isActive: boolean;
}