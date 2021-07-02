const {Schema, model} = require('mongoose');

const car = new Schema({
    title: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
})

module.exports = model('Car', car);