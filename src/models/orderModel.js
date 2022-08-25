const mongoose = require('mongoose');
objectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    userId:{
        type: objectId,
        ref: 'User'
    },
    productId:{
        type: objectId,
        ref: 'Product'
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date: String

},{timestamps:true})

module.exports = mongoose.model('Order', orderSchema)