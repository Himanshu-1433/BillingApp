const mongodb = require("mongoose");
let scheme = new mongodb.Schema({
    BillingName : String,
    BillingType : String,  
});

let collectionName = "BillingDoc";
let model = mongodb.model(collectionName , scheme , collectionName);
module.exports = model;

