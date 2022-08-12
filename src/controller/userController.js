const userModel = require('../models/userModel')

const createData = async function(req,res){
    let data =req.body
    let saveData = await userModel.create(data)
    res.send({msg:saveData})
}

const getData = async function(req, res){
    let allUser = await userModel.find()
    res.send({msg: allUser})
}




module.exports.createData=createData
module.exports.getData=getData