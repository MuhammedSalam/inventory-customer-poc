"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const customer_order_entity_1 = require("../../entity/customer-order-entity");
const customer_order_product_1 = require("../../entity/customer-order-product");
exports.saveCustomerOrder = function (custOrder) {
    let obj = JSON.parse(custOrder);
    let custOrderObj = new customer_order_entity_1.CustomerOrder();
    for (let key in obj) {
        switch (key) {
            case "order":
                custOrderObj.OrderId = obj[key][0].OrderID;
                custOrderObj.CustomerID = obj[key][0].UserID;
                custOrderObj.OrderDate = obj[key][0].OrderDate;
                custOrderObj.TotalAmount = obj[key][0].TotalAmount;
                break;
        }
    }
    let resId;
    return typeorm_1.getManager().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
        const insertResult = yield transactionalEntityManager.createQueryBuilder()
            .insert()
            .into(customer_order_entity_1.CustomerOrder)
            .values(custOrderObj)
            .execute();
        this.saveCustomerOrderProduct(insertResult.identifiers[0].CustOrderID, custOrder);
    }));
};
exports.saveCustomerOrderProduct = function (custOrderID, custOrderProd) {
    let obj = JSON.parse(custOrderProd);
    let custOrderProdObj = new customer_order_product_1.CustomerOrderProduct();
    for (let key in obj) {
        switch (key) {
            case "product":
                custOrderProdObj.CustOrderId = custOrderID;
                custOrderProdObj.ProductName = obj[key][0].Name;
                custOrderProdObj.ProductDescription = obj[key][0].Description;
                custOrderProdObj.ProductPrice = obj[key][0].Price;
                custOrderProdObj.Quantity = obj[key][0].ProdCount;
                break;
        }
    }
    return typeorm_1.getManager().getRepository(customer_order_product_1.CustomerOrderProduct).save(custOrderProdObj);
};
//# sourceMappingURL=customer-order.js.map