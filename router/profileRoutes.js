var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const userController = require("../controllers/userController");
// const authentication = require("../middleWares/authentication").verifyToken;
// const authentication = require("../middleWares/adminAuthentication").verifyToken;

router.post("/add", (req, res) => {
  let payload = req.body;
  return sendResponse.executeMethod(userController.addUser, payload, req, res);
});

router.put("/reset-password", (req, res) => {
  return sendResponse.executeMethod(
    userController.resetNewPassword,
    req.body,
    req,
    res
  );
});

router.post("/login", (req, res) => {
  return sendResponse.executeMethod(userController.login, req.body, req, res);
});

router.put("/edit_profile", (req, res) => {
  return sendResponse.executeMethod(
    userController.createProfile,
    req.body,
    req,
    res
  );
});

router.get("/detail_Profile/:id", (req, res) => {
  return sendResponse.executeMethod(
    userController.getProfileById,
    req.params,
    req,
    res
  );
});

router.get("/generatePassword", async (req, res) => {
  try {
    await userController.validateToken(req.query);
    // return sendResponse.sendSuccessMessage("success", data, res);
    res.render("change-password-admin", {
      token: req.query.token,
      email: req.query.email,
    });
  } catch (err) {
    if (err) {
      return sendResponse.sendErrorMessage(
        err && err.isJoi ? err.details[0].message : err.message,
        {},
        res
      );
    } else {
      res.render("link-expired");
    }
  }
});

router.post("/forgot-password", (req, res) => {
  return sendResponse.executeMethod(
    userController.forgotPassword,
    req.body,
    req,
    res
  );
});

module.exports = router;
