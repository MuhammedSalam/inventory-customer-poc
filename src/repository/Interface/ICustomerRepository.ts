//import { Post } from "../post";

import { Customer } from "../../entity/customer-entity";
export interface ICustomerRepository {

    getOrders(userId: number): any;

    getOrderDetailsByOrderId(orderId: number): any;

    getInvoiceDetails(orderId: number): any;

}