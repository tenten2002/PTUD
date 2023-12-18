const { body } = require('express-validator');
const message = require('../helper/message');
const util = require('util');

var options = {
    name: {
        min: 10,
        max: 80
    },
    description: {
        min: 10,
        max: 80
    },
    price: {
        min: 0
    }
};

module.exports = {
    validator: function () {
        return [
            body('name', util.format(message.size_string_message, 'name',
                options.name.min, options.name.max)).isLength(options.name),
            body('description', util.format(message.size_string_message, 'description',
                options.description.min, options.description.max)).isLength(options.description),
            body('image', 'image must be a valid URL').isURL(),
            body('price', 'price must be a valid number and greater than or equal to 0').isNumeric()
        ];
    },
};