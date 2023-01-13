const jobModel=require("../model/model")
const applyjobModel=require("../model/applyjob")
const jwt = require("jsonwebtoken");

let createJob=async function(req,res){
    try{
    let title=req.body.title
    var email=req.body.email
    let description=req.body.description
   
    if(!title || title.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give valid title"})}
    if(!email|| email.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give valid email"})}
    let checkdupEmail=await jobModel.findOne({email:email})
    
    if(checkdupEmail && Object.keys(checkdupEmail).length>0){return res.status(400).send({status:false,msg:"bad request",data:"this email is already saved"})}
    if(!description || description.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give valid description"})}
let saveJob= await jobModel.create(req.body)
return res.status(201).send({status:true,msg:"ok",data:saveJob})}
catch(err){return res.status(500).send("something went wrong on our side")}
}

let getjob=async function(req,res){
    try{
    let filter={}
    if(req.body.requiredSkills){
     
       let requiredSkills=req.query.requiredSkills
       
        if(!Array.isArray(requiredSkills)){return res.status(400).send("requiredSkills should be an array")}
        filter.requiredSkills=requiredSkills}
        if(req.query.experience){filter.experience=req.query.experience}
        if(req.query.title){filter.title=req.query.title}
        if(req.query.description){filter.description=req.query.description}
        if(req.query.email){filter.email=req.query.email}
       
    let getJobData=await jobModel.find(filter)
    return res.status(200).send({status:true,msg:"success",data:getJobData})}
    catch(err){return res.status(500).send("something webt wrong on our side")}
}

let applyJob=async function(req,res){
  try{
let name=req.body.name
let email=req.body.email
var applyingFor=req.body.applyingFor
var resume=req.body.resume
var coverLetter=req.body.coverLetter

if(!name || name.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give name"})}
if(!email || email.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give email"})}
let checkdupEmail=await applyjobModel.findOne({email:email})
    
if(checkdupEmail && Object.keys(checkdupEmail).length>0){return res.status(400).send({status:false,msg:"bad request",data:"this email is already saved"})}
if(!applyingFor || applyingFor.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give applyingFor"})}
let checkIsApplyingForCorrectJob= await jobModel.findOne({title:applyingFor})
if(!checkIsApplyingForCorrectJob || Object.keys(checkIsApplyingForCorrectJob).length<1){return res.status(400).send("this job is not available")}
if(!resume || name.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give resume"})}
if(!coverLetter || coverLetter.trim().length<1){return res.status(400).send({status:false,msg:"bad request",data:"please give coverletter"})}
let apply=await  applyjobModel.create(req.body)
return res.status(201).send({status:true,msg:"success",data:apply})}
catch(err){return res.status(500).send("error on our side")}

}


const login = async function (req, res) {
    try {
      
  
    
      let username = req.body.email;
      if (!username) {
        return res.status(400).send({ status: false, msg: "please enter email" });
      }
     
      let savelogin = await jobModel.findOne({
        email: username
       
      });
      if (!savelogin) {
        return res
          .status(400)
          .send({ status: false, msg: "username  incorrect" });
      }
      let token = await jwt.sign(
        {
          userId: savelogin.email,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 30 * 60 * 60,
        },
        "shubham kumar"
      );
      res.setHeader("Authentication", token);
      res.status(201).send({ status: true,msg:"sucess",data: token });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  };

  let viewjob=async function(req,res){
    try{
  
       
    let viewJobData=await applyjobModel.find()
    return res.status(200).send({status:true,msg:"success",data:viewJobData})}
    catch(err){return res.status(500).send("something webt wrong on our side")}
}

let updateJob=async function(req,res){
    try{
        
    let emailId=req.params.email
    let title=req.body.title
    var description=req.body.description
    var email=req.body.requiredSkills
    let updateObj={
    
    }
    if(title && title.trim().length>0){updateObj.title=title}
    if(description && description.trim().length>0){updateObj.description=description}
        
    if(email && email.trim().length>0){updateObj.email=email}
    
    if(title || description || email){
        let updatejob=await jobModel.findOneAndUpdate({email:emailId},updateObj,{new:true})
        return res.status(202).send(updatejob)
    }
    else{
        return res.status.send("nothing to update")
    }}
    catch(err){return res.status(500).send("error on server side")}
}
module.exports.createJob=createJob
module.exports.getjob=getjob
module.exports.applyJob=applyJob
module.exports.login=login
module.exports.viewjob=viewjob
module.exports.updateJob=updateJob