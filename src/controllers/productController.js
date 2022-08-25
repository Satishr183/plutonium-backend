const productModel = require("../models/productModel")

const createProduct= async function (req, res){
    let product = req.body
    let data = await productModel.create(product)

    res.send({msg:data})
}

module.exports.createProduct=createProduct