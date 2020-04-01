import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { kMaxLength } from "buffer";

@Entity("CustomerOrderProduct")
export class CustomerOrderProduct {

    @PrimaryGeneratedColumn()
    CustOrderProductId!: number;
    @Column({
        
    })
    CustOrderId!: number;

    @Column({
        
    })
    ProductName!: string;

    @Column({
        
    })
    ProductDescription!: string;
    @Column({
        
    })
    ProductPrice!: number;
    
}