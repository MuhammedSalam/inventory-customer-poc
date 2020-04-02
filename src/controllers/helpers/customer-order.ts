
import { getManager } from "typeorm";
import { CustomerOrder } from "../../entity/customer-order-entity";
import { CustomerOrderProduct } from "../../entity/customer-order-product";

exports.saveCustomerOrder = function (custOrder: any) {

    let obj = JSON.parse(custOrder);
    let custOrderObj: CustomerOrder = new CustomerOrder();
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
    return getManager().getRepository(CustomerOrder).save(custOrderObj);

};

exports.saveCustomerOrderProduct = function (custOrderProd: any) {

    let obj = JSON.parse(custOrderProd);
    let custOrderProdObj: CustomerOrderProduct = new CustomerOrderProduct();
    for (let key in obj) {

        switch (key) {
            case "product":
                custOrderProdObj.CustOrderId = obj["order"][0].OrderID;
                custOrderProdObj.ProductName = obj[key][0].Name;
                custOrderProdObj.ProductDescription = obj[key][0].Description;
                custOrderProdObj.ProductPrice = obj[key][0].Price;
                custOrderProdObj.Quantity=obj[key][0].ProdCount;
                break;
        }

    }
    return getManager().getRepository(CustomerOrderProduct).save(custOrderProdObj);

};