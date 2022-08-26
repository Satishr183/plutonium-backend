const userModel = require("../models/userModel")


const createUser= async function (req, res){
    let user = req.body
    let data = await userModel.create(user)

    res.send({msg:data})
}

module.exports.createUser= createUser
