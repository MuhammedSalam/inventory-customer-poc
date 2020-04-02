import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { kMaxLength } from "buffer";

@Entity("CustomerOrderProduct")
export class CustomerOrderProduct {

    @PrimaryGeneratedColumn()
    CustOrderProductId!: number;

    @Column({
        name: "CustOrderId",
        nullable: false,
    })
    CustOrderId!: number;

    @Column({
        name: "ProductName",
        nullable: false,
        length: 255
    })
    ProductName!: string;

    @Column({
        name: "ProductDescription",
        nullable: false,
        length: 255
    })
    ProductDescription!: string;

    @Column({
        name: "ProductPrice",
        nullable: false  
    })
    ProductPrice!: number;

    @Column({
        name: "Quantity",
        nullable: false
    })
    Quantity!: number;

}