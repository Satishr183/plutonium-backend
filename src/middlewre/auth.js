const jwt = require("jsonwebtoken");


const mid = function(req, res, next){
  try{
    let token = req.headers["x-auth-token"];
    // if (!token) token = req.headers["x-auth-token"];

//If no token is present in the request header return error. This means the user is not logged in.
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
 
   // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

  // Decoding requires the secret again. 
  // A token can only be decoded successfully if the same secret was used to create(sign) that token.
  // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token 
  //must have been issued by the same server in past.

  let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
  if (!decodedToken)
    return res.status(403).send({ status: false, msg: "token is invalid" });
  let userToBeModified = req.params.userId
  let loggedInUser = decodedToken.userId
  if(userToBeModified !== loggedInUser) 
    return res.status(404).send({status:false, msg:'You are trying to access other profile ID'})

    next()
}catch(err){
  res.status(500).send({error:err.message})
}
}


module.exports.mid=mid