const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const mid = function ( req, res, next) {
let isFreeAppUser= req.headers.isfreeappuser
    
    if(!isFreeAppUser){
        res.send({status:false, msg:"request is missing !. Mandatory header"})
        
    }else{

        next()
    }
    
}

const mid2= function(req, res, next){
    let isFreeAppUser = req.headers.isfreeappuser
    if(isFreeAppUser===true){
        console.log("No amount is deducted");
        let orderVal = orderModel.findByIdAndUpdate(
            {$set:{isFreeAppUser:true}},
            {new:true}
        )
        next()
        
    }else{
        let productId = req.body.productId
        let productPrice = productModel.findById(productId).select({price:1,_id:0})
        console.log(productPrice)
        let userBalance = userModel.findOneAndUpdate(
            {balance:{$gt:productPrice}},
            {$set:{balance:{$eq:productPrice}}}
        )
        next()
    }
  
}


module.exports.mid2=mid2
module.exports.mid=mid