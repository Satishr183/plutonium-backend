const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const mid = function ( req, res, next) {
let isFreeAppUser= (req.headers.isfreeappuser)
    
    if(!isFreeAppUser){
        res.send({status:false, msg:"request is missing !. Mandatory header"})
        
    }else{

        next()
    }
    
}

const mid2= async function(req, res, next){
    let isFreeAppUser=(req.headers.isfreeappuser)
    let data =req.body
    let isproduct = await productModel.findOne({_id:data.productId})
    let isuser =await userModel.findOne({_id:data.userId});
   
    if(isFreeAppUser=='true'){
        data.isFreeAppUser=true
        next()

    }else if (isproduct['price']<isuser['balance']){
        let valUpdate=isuser['balance']-isproduct['price']
        let balanceOfUser= await userModel.findOneAndUpdate({_id:data.userId},{$set:{balance:valUpdate}},
        {new:true}    )
        
        console.log(balanceOfUser);
        data.isFreeAppUser=false
        data.amount=isproduct['price']
        next()
    }
     else
        return res.send("no enough balance")
    }
  



module.exports.mid2=mid2
module.exports.mid=mid