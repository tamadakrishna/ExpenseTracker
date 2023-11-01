const model = require('../models/model');

//Create Transaction
async function create_Transaction(req, res){
    if(!req.body) return res.status(400).json("POST HTTP Data not Provided");
    let {name, type, amount } = req.body;

    const create = await new model.Transaction({
        name,
        type,
        amount,
        date:new Date()
    })

    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({message :`Error While creaating transaction ${err}`});
    })

}

//Get Transasction
async function get_Transaction(){
    let data = await model.Transaction.find({});
    return data;
}

//Delete Transaction
async function delete_Transaction(req, res){
    if(!req.body) res.status(400).json({message: "Request body not found"});
    await model.Transaction.deleteOne(req.body, function(err){
         if(!err) res.json("Record Deleted");
    }).clone().catch(function(err){res.json("Error while deleting Transaction Record")});
}

module.exports = {
     get_Transaction,
     create_Transaction,
     delete_Transaction
     }