const mongodb = require("mongoose");
const URL = "mongodb://0.0.0.0:27017/BillingAppApi";

let connection = mongodb.connect(URL).then(() => {
    console.log("Database connected succesfully!");
}).catch((err) => {
    console.error("Could Not Connect : " , err);
});

module.exports = connection;