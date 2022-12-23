var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
let base = "http://localhost:8081";
const plateformController = require("../controllers/plateformController");
const industryCategoryController = require("../controllers/industryCategoryController");


 
router.get("/", async (req, res) => {
  console.log("This is query====>",req.query) 
  var id = JSON.parse(JSON.stringify(req.query));
 console.log("this is from applify.ejs file",id)
  let data = await plateformController.getPlateform(); 
  console.log("data=====>",data)
  console.log("This is query in line 18 ====>",req.query) 
  let i=parseInt(id.id)
  console.log("data of web=====>",data?.dataValues?.web) 
  console.log("data of mobile=====>",data?.dataValues?.mobile) 
  console.log("This  id=====>",typeof(i))
  console.log("data of web=====>",typeof(data?.dataValues?.web))

  // let datas=await industryCategoryController.getPlateform(id.id) 
  if (data?.dataValues?.web==parseInt(id.id)) {
    console.log("this is if statementn first")
    res.render("applify", {
      imgs: "/public/images/cate2.png",
      imgId: 4,  
      order: 6,
      data: data,  
      base: base,
    }); 
  } 
  else if (data?.dataValues?.mobile == parseInt(id.id)) {
    console.log("this  eles if second")
    res.render("applify", {
      imgs: "/public/images/app1.png",
      imgId: 5,
      order: 19,
      data: data,
      base: base,
    });
  } 
  else{
    console.log("this  eles part third")
    res.render("applify", {
      imgs: "/public/images/app1.png",
      imgId: 5,
      order: 12,
      data: data,
      base: base,
    });
  }

});


// router.get("/get", async (req, res) => {
//   var id = JSON.parse(JSON.stringify(req.query));
//   console.log("thisisisisisiis", id.id);
//   console.log("My data" + JSON.stringify(req.query));

//   let data = await industryCategoryController.getPlateforms(id.id);
//   res.render("applify", {
//     imgs: "/public/images/app1.png",
//     imgId: data.id,
//     order: 7,
//     counts: data.count,
//     data: data.rows,
//     base: base,
//   });
// });

router.get("/addcatergory", (req, res) => {
  res.render("addcatergory", { base: base });
});

module.exports = router;
