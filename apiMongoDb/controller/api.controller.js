const MODEL = require("../model/billing.model");
let selectData = async (req , res) => {
    let dataRes = await MODEL.find({});
    if (dataRes.length == 0) {
        console.log("Data Not Found! : " , dataRes);
        res.send({response : false})
    }
    else {
        res.send(dataRes);
    }
}

let selectDataById = (req ,res) => {
    MODEL.find({_id :req.params.id}).then(() => {
        res.send([dataRes]);
    }).catch((err) => {
        console.log(err)
        res.send({response : false})
    });
}

let postData = (req ,res) => {
    new MODEL(req.body).save().then(() => {
        res.send({insert : true});
    }).catch((err) => {
        res.send({error : err});
    })
} 

let updateData = (req , res) => {
    MODEL.updateOne(
        {
            _id : req.params.id
        },
        {
            $set : {
                BillingName : req.body.BillingName,
                BillingType : req.body.BillingType,
            }
        }
    ).then(() => {
        res.send({ update : true });
    }).catch((err) => {
        res.send({error : err});
    })
}

let deleteData = (req , res) => {
    MODEL.deleteOne({_id : req.params.id}).then(() => {
        res.send({delete : true});
    }).catch((err) => {
        res.send({error : err});
    })
} 

module.exports = {selectData , selectDataById ,postData , updateData , deleteData};