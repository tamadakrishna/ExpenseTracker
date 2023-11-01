const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// transactions =>field = > ['name', 'type', 'amount', 'date']
const transaction_model = new Schema({
    name: {type:String, default: "Anonymous"},
    type:{type: String, default:"Investment"},
    amount:{type:Number, default:0},
    date:{type:Date, default: Date.now}
})

const Transaction = mongoose.model('transaction', transaction_model);

exports.default = Transaction;

module.exports = {
    Transaction
}

