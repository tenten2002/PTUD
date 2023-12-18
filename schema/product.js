const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 80
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 80
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^https?:\/\/.+\..+/i.test(value);
            },
            message: "Invalid URL format for image."
        }
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', schema);;