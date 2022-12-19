var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const addUserController=require("../controllers/adduserCategoryController")


router.post("/addusercategory", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(addUserController.adduserCategory, payload, req, res);
});


router.get("/getusercategory", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(addUserController.getuserCategory, payload, req, res);
  });


module.exports = router;
