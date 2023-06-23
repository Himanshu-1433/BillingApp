const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db-config/db.config");
const PORT = 4201;
const app = express();
const cors = require("cors");
const routes = require("./routing/api.routes")
let routePaths = {
    api_model : {
        getDefault : "/billing/get",
        getById : "/billing/get/id=?",
        postData : "/billing/post",
        putData : "/billing/put/id=:id",
        deleteData : "/billing/delete/id=:id",
    }
}
app.use(bodyParser.json());

app.use("/intro/api" , (req , res) => {
    res.send(routePaths);
})

app.use(
    cors({
        origin : "*",
    })
)

app.use(bodyParser.urlencoded({
    extended : false,
}))

app.use("/" , routes);

app.listen(PORT , () => {
    console.log("server are listen on :: http://localhost:4201/");
})

