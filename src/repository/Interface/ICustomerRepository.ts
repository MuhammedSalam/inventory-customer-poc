//import { Post } from "../post";

import { Customer } from "../../entity/customer-entity";
export interface ICustomerRepository {

    getOrders(): any;

    getOrderDetailsById(orderId: number): any;

    getInvoiceDetails(orderId: number): any;

}