const express=require("express")
const router=express.Router()
const jobController=require("../controller/jobcontroller")
const mid=require("../middleware/mid")
router.post("/job-creation",jobController.createJob)
router.get("/get-job",jobController.getjob)
router.post("/apply-job",jobController.applyJob)
router.get("/login",jobController.login)

router.get("/view-job",mid.authent,jobController.viewjob)
router.put("/update-job/:email",mid.authent,mid.authorise,jobController.updateJob)
module.exports=router