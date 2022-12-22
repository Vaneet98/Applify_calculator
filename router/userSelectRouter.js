var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const userSelectorController=require("../controllers/userSelectorController")


router.post("/adduserDetail", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(userSelectorController.addDetail, payload, req, res);
});



router.get("/getuserDetail", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(userSelectorController.getDetail, payload, req, res);
  });


module.exports = router;
