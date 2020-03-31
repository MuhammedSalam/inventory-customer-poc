import { injectable } from "inversify";
import { ICustomerRepository } from './Interface/ICustomerRepository';
import { getManager } from "typeorm";
import { Customer } from "../entity/customer-entity";
import { Order } from "../entity/order-entity";

@injectable()
export class CustomerRepository implements ICustomerRepository {

    getOrders() {

        return getManager().getRepository(Order).find();

    }

    getOrderDetailsById(orderId: number) {

        return getManager().getRepository(Order).find();
    }

    getInvoiceDetails(orderId: number) {
        return getManager().getRepository(Order).find();
    }
  
}