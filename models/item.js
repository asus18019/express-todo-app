const { Schema, model } = require('mongoose');

const schema = new Schema({
    nickname: {type: String, required: true},
    date: {type: String, required: true},
    text: {type: Number, required: true},
    comment: {type: Number, required: true},
})

module.exports = model('Item', schema);