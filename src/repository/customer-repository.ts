import { injectable } from "inversify";
import { ICustomerRepository } from './Interface/ICustomerRepository';
import { getManager } from "typeorm";
import { Customer } from "../entity/customer-entity";
import { CustomerOrder } from "../entity/customer-order-entity";
import { CustomerOrderProduct } from "../entity/customer-order-product";

@injectable()
export class CustomerRepository implements ICustomerRepository {

    getOrders(userId:number) {

        return getManager().getRepository(CustomerOrder).find();

    }

    getOrderDetailsByOrderId(orderId: number) {
        
        return getManager()
            .query('GetOrderDetailsByOrderId @orderId=' + orderId);

    }

    getInvoiceDetails(orderId: number) {
        return getManager()
        .query('GetInvoiceDetailsByOrderId @orderId=' + orderId);
    }
  
}