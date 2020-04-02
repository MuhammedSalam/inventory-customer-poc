import * as express from 'express';
import { interfaces, controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from 'inversify';
import TYPES from '../type';
import { ICustomerRepository } from '../repository/Interface/ICustomerRepository';

@controller("/customers")
export class CustomerController implements interfaces.Controller {

    private _customerRepository: ICustomerRepository;
    constructor(@inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository) {
        this._customerRepository = customerRepository;
    }

    @httpGet("/:id")
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetAllOrders ==> GET");

            await this._customerRepository.getOrders(parseInt(req.params.id)).then((result: any) => {
                console.log("Result : " + result);

                res.send(result);
            });
        }
        catch{

        }
    }

    @httpGet("/GetOrderDetails/:id")
    public async GetOderDetailById(@request() req: express.Request, @response() res: express.Response) {
        try {
            await this._customerRepository.getOrderDetailsByOrderId(parseInt(req.params.id)).then((result: any) => {
                console.log("Result : " + result);

                res.send(result);
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/GetInvoiceDetails/:id")
    public async Index(@request() req: express.Request, @response() res: express.Response) {
        try {

            await this._customerRepository.getInvoiceDetails(parseInt(req.params.id)).then((result: any) => {
                console.log("Result : " + result);
                res.send(result);
            });
        } catch (error) {
            res.status(400).json(error);
        }
    }
}