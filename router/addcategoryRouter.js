var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const categoryController=require("../controllers/addcategoryController")


router.post("/addcategory", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(categoryController.addCategory, payload, req, res);
});

router.put("/editcategory", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(categoryController.editCategory, payload, req, res);
  });

router.get("/getcategory", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(categoryController.getCategroy, payload, req, res);
  });


module.exports = router;
