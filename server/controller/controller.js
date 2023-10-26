const model = require('../models/model');


//Create Categories
async function create_Categories(req,res){
    const Create = new model.Categories({
        type:"Investment",
        color:'rgb(54, 208, 245)'
    })

     await Create.save(function(err){
        if(!err) return res.json(Create);
        return res.status(400).json({message: `Error while creating categories ${err}`});
    })
}

//Get Categories
async function get_Categories(){
    let data = await model.Categories.find({})
    let filter = await data.map(v=>Object.assign({}, {type: v.type, color:v.color}));
    return filter;
}

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

//Get Labels
async function get_Labels(req, res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from: "categories",
                localField: "type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result=>{
        let data = result.map(v => Object.assign({},{_id:v._id, name:v.name,type:v.type,amount:v.amount,color:v.categories_info["color"]}));
        res.json(data);
    }).catch(error=>{ 
        res.status(400).json("Lookup Collection Error");
    })
}


module.exports = {
     get_Transaction,
     get_Categories,
     create_Categories,
     create_Transaction,
     delete_Transaction,
     get_Labels
     }