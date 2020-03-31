import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { kMaxLength } from "buffer";

@Entity("Order")
export class CustomerOrder {

    @PrimaryGeneratedColumn()
    CustOrderID!: number;

    @Column({
        
    })
    OrderDetails!: string;

    @Column({
        
    })
    UserID!: number;
    
}