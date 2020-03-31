import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Order")
export class Order {

    @PrimaryGeneratedColumn()
    OrderID!: number;

    @Column({
        
    })
    CartID!: number;

    @Column({
        
    })
    UserID!: number;
    
}