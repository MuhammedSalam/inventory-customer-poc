import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { kMaxLength } from "buffer";

@Entity("CustomerOrder")
export class CustomerOrder {

    @PrimaryGeneratedColumn()
    CustOrderID!: number;

    @Column({
        
    })
    OrderId!: number;

    @Column({
        
    })
    CustomerID!: number;
    @Column({
        
    })
    OrderDate!: Date;
    @Column({
        
    })
    TotalAmount!: number;
    
}