const userModel = require("../models/userModel")





const basicCode= async function(req, res, next) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    //res.send({ msg: "This is coming from controller (handler)"})
    next()
    }

// const createUser= async function (req, res) {
    
//     let data= req.body
//     let tokenDataInHeaders= req.headers.today
//     //Get all headers from request
//     console.log("Request headers before modificatiom",req.headers)
//     //Get a header from request
//     console.log(req.headers.batch)
//     console.log(req.headers["content-type"])
//     console.log(tokenDataInHeaders)
//     //Set a header in request
//     req.headers['month']='June' //req.headers.month = "June"

//     req.headers['data']

//     //Set an attribute in request object
//     req.anything = "everything"
    
    
//     console.log("Request headers after modificatiom",req.headers)
//     console.log(data.age);

//     let obj={
//         "name":"Satish Rajbanshi",
//         "city":"Dhanbad",
//         "pincode":828202
//     }

//     console.log(obj.pincode)
//     console.log(obj['pincode'])
//     const {...a}=obj
//     console.log(a);
    
//     //Set a header in response
//     res.header('year','2022')
//     res.send({msg: "hi"})
// }

const createUser= async function (req, res){
    let user = req.body
    let data = await userModel.create(user)

    res.send({msg:data})
}

module.exports.createUser= createUser
