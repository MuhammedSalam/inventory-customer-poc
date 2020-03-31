import { injectable } from "inversify";
import { ICustomerRepository } from './Interface/ICustomerRepository';
import { getManager } from "typeorm";
import { Customer } from "../entity/customer-entity";
import { CustomerOrder } from "../entity/customer-order-entity";

@injectable()
export class CustomerRepository implements ICustomerRepository {

    getOrders() {

        return getManager().getRepository(CustomerOrder).find();

    }

    getOrderDetailsById(orderId: number) {

        return getManager().getRepository(CustomerOrder).findOne(orderId);
    }

    getInvoiceDetails(orderId: number) {
        return getManager().getRepository(CustomerOrder).findOne(orderId);
    }
  
}