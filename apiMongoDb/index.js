let express = require("express");
let bodyParser = require("body-parser");
const db = require("./db-config/db.config")
const PORT = 4201;
let app = express();
let cors = require("cors");

app.use(bodyParser.json());
app.use(
    cors({
        origin : "*",
    })
)

app.use(bodyParser.urlencoded({
    extended : false,
}))

app.use("/" , (req , res) => {
    res.send("hello world");
})

app.listen(PORT , () => {
    console.log("server are listen on 4201");
})

