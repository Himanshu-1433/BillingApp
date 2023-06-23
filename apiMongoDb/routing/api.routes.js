const express = require("express");
const routes = express.Router();
const apiControler = require("../controller/api.controller");

routes.get("/billing/get" , apiControler.selectData);
routes.get("/billing/get/id=:id" , apiControler.selectDataById);
routes.post("/billing/post" , apiControler.postData);
routes.put("/billing/put/id=:id" , apiControler.updateData);
routes.delete("/billing/delete/id=:id" , apiControler.deleteData);
 
module.exports = routes;