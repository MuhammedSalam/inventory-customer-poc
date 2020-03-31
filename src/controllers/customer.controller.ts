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

    @httpGet("/")
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            console.log("Received GetAllEmployees ==> GET");

            await this._customerRepository.getOrders().then((result: any) => {
                console.log("Result : " + result);

                res.send(result);
            });
        }
        catch{

        }
    }

    @httpGet("/:id")
    public GetById(@request() req: express.Request, @response() res: express.Response) {
        try {
            const posts = this._customerRepository.getOrderDetailsById(parseInt(req.params.id));
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/")
    public Index(@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log(req.body);
            const posts = this._customerRepository.getInvoiceDetails(req.body);
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}