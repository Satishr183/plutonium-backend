const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  try{
  let data = abcd.body;
  let savedData = await userModel.create(data);
  xyz.status(201).send({ msg: savedData });
}
catch(err){
   xyz.status(500).send({error:err.message})
}
}

const userPosts = async function(req, res){
  try{
    let userId = req.params.userId
    let user = await userModel.findOne(userId)
    let post = req.body.post
    res.status(202).send({data:user})
  }catch(err){
    res.status(500).send({error:err})
  }
}

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({ status: false,msg: "username or the password is not corerct"});

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, token: token });
  }catch(err){
    res.status(500).send({error:err.message})
  }
}

const getUserData = async function (req, res) {
  
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });
  if(userDetails.isDelete===true)
    return res.status(404).send({status:false,msg:'User is not present in Database'})
  else
  res.status(202).send({ status: true, data: userDetails });
  // Note: Try to see what happens if we change the secret while decoding the token
}catch(err){
  res.status(500).send({error:err.message})
}
}

const updateUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
 try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(404).send("No such user exists");
  }
  if(user.isDelete===true){
    return res.status(404).send({msg:'User Deleted not able to update !'})
  }
  

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(202).send({ status: true, data: updatedUser });
}catch(err){
  res.status(500).send({error:err.message})
}
}


const deleteUser=async function(req, res){
try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).send("No such user exists");
  }
  let deleteData = await userModel.findOneAndUpdate({_id:user},{$set:{isDelete:true}},{new:true})
  res.status(202).send({data:deleteData})
}catch(err){
  res.status(500).send({error:err.message})
}
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.userPosts=userPosts
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser =deleteUser
