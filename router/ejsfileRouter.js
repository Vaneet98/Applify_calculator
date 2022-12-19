var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
let base = "http://localhost:8081";
const plateformController=require("../controllers/plateformController")
const industryCategoryController=require("../controllers/industryCategoryController")
 
// router.get("/", async(req, res) => {
//   var id=JSON.parse(JSON.stringify(req.query)  ) 
//   console.log("thisisisisisiis",id.id)  
//   console.log("My data" + JSON.stringify(req.query));    
      
//   let data=await plateformController.getPlateform()
//   // let datas=await industryCategoryController.getPlateform(id.id)                 
//   if(id.id==1){ 
//     res.render("applify", {
//       imgs:"/public/images/app1.png",
//       imgId:4, 
//       order:6,
//       data:data,
//       base: base,    
//     });
//   } else if(id.id==2){
//     res.render("applify", {
//       imgs:"/public/images/app1.png",
//       imgId:5, 
//       order:9,
//       data:data,
//       base: base,
//     });
           
//   }               
//   else{   
//     res.render("applify", {
//       imgs:"/public/images/app1.png",
//       imgId:6, 
//       order:10,
//       data:data, 
//       base: base,
//     });
//   }
//   }); 
  

router.get("/", async(req, res) => {
  let data=await plateformController.getPlateform()            
  console.log(data.dataValues.id)
    res.render("applify", {
      imgs:"/public/images/app1.png",
      data:data,
      base: base,    
      order:5 
    });
   
  }); 
         
    

router.get("/get", async(req, res) => {
  var id=JSON.parse(JSON.stringify(req.query)  ) 
  console.log("thisisisisisiis",id.id)  
  console.log("My data" + JSON.stringify(req.query));    
      
  let data=await industryCategoryController.getPlateform(id.id)  
  console.log("this is data=======>",data.rows.dataValues)               
    res.render("applify", { 
      imgs:"/public/images/app1.png",
      imgId:data.id,
      order:7,
      counts:data.count,
      data:data.rows, 
      base: base,    
    });
   
  }); 
    
router.get("/addcatergory", (req, res) => {
    res.render("addcatergory",{base:base});
  });
       


  module.exports = router;