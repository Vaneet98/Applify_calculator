var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const plateformController=require("../controllers/plateformController")


router.post("/addplateform", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(plateformController.addPlateform, payload, req, res);
});

router.put("/editplateform", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(plateformController.editPlateform, payload, req, res);
  });

router.get("/getplateform", (req, res) => {
    let payload = req.body;
    return sendResponse.executeMethod(plateformController.getPlateform, payload, req, res);
  });


module.exports = router;
