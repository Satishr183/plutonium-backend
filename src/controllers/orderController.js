const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const createOrder = async function (req, res) {
  let order = req.body;
  let userId = order.userId;
  let productId = order.productId;
  if (userId) {
    if (productId) {
      let id = await userModel.findById(userId).select({ _id: 1 });
      if (id) {
        let id1 = await productModel.findById(productId).select({ _id: 1 });
        if (id1) {
          let isFreeAppUser=req.headers.isfreeappuser
          let orderCreate = await orderModel.create(order);
          res.send({ data: orderCreate });
        } else {
          res.send({ msg: "Invalid Product Id" });
        }
      } else {
        res.send({ msg: "Invalid User Id" });
      }
    } else {
      res.send({ msg: "Product id required" });
    }
  } else {
    res.send({ msg: "User id required" });
  }
};

module.exports.createOrder = createOrder;
