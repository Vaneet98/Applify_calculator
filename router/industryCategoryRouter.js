var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const industryCategoryController=require("../controllers/industryCategoryController")


router.post("/addplateform", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(industryCategoryController.addPlateform, payload, req, res);
});

router.put("/editplateform", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(industryCategoryController.editPlateform, payload, req, res);
  });

router.get("/getplateform/:typeId", (req, res) => {
    let payload = req.params;
    return sendResponse.executeMethod(industryCategoryController.getPlateform, payload, req, res);
  });


module.exports = router;
