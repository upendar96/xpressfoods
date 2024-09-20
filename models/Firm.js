const mongoose = require('mongoose')

const firmSchema = new mongoose.Schema({
    firmname: {
        type: String,
        require: true,
        
    },
    area: {
        type: String,
        require: true

    },
    catagory: {
        type: [{
            type: String,
            enum: ['veg', 'nonveg']
        }],
        require: true

    },
    region: {
        type: [{
            type: String,
            enum: ['southindian', 'northindian', 'chineese', 'bekary']
        }

        ],
        require: true

    },
    offer: {
        type: String,

    },
    image: {
        type: String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
const Firm=mongoose.model('Firm',firmSchema);
module.exports=Firm;
