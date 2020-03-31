import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Customer")
export class Customer {

    @PrimaryGeneratedColumn()
    CustomerId: number = 0;

    @Column({
        length: 100
    })
    FirstName: string = "";

    @Column({
        length: 100
    })
    LastName: string = "";

    @Column({
        length: 100
    })
    Email: string = "";

    @Column({
        length: 100
    })
    Password: string = "";

    @Column({
        length: 100
    })
    UserName: string = "";

    @Column({
        length: 100
    })
    UserType: string = "";
}