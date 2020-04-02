"use strict";
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
    return typeorm_1.getManager().getRepository(customer_order_entity_1.CustomerOrder).save(custOrderObj);
};
exports.saveCustomerOrderProduct = function (custOrderProd) {
    let obj = JSON.parse(custOrderProd);
    let custOrderProdObj = new customer_order_product_1.CustomerOrderProduct();
    for (let key in obj) {
        switch (key) {
            case "product":
                custOrderProdObj.CustOrderId = obj["order"][0].OrderID;
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