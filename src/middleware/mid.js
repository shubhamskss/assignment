let jwt = require("jsonwebtoken");
let mongoose=require('mongoose')
let jobModel= require("../model/model");

let authent = function (req, res, next) {
  try {
    
    
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(404).send({ status: false, msg: "token not found" });
    }
    let decodetoken = jwt.verify(token, "shubham kumar");
    if (!decodetoken) {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


let authorise = async function (req, res, next) {
    try {
      var email = req.params.email;
      
      if (!email) {
        return res
          .status(400)
          .send({ status: false, msg: "emailId is required for authorisation" });
      }
     
      let token = req.headers["authorization"];
    if (!token) {
      return res.status(404).send({ status: false, msg: "token not found11" });
    }
    let decodetoken = jwt.verify(token, "shubham kumar");
    if (!decodetoken) {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
      var emailId = await jobModel.findOne({email:email});
      
  if(!emailId){return res.status(404).send({status:false,msg:"no document found with given emailid"})}
      let jobtobeModified = emailId.email;
      let userloggedin = decodetoken.userId;
      
    
      if(!userloggedin){return res.status(400).send({status:false,msg:"bad request"})}
      
      if (jobtobeModified != userloggedin) {
        return res
          .status(403)
          .send({ status: false, msg: "you are not authorised" });
        
      }
      next()
    
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }}

module.exports.authent=authent
module.exports.authorise=authorise