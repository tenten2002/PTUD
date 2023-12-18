var Product = require('../schema/product');

module.exports = {
    getAll: function (query) {
        var sort = {};
        var Search = {};
        if (query.sort) {
            if (query.sort[0] == '-') {
                sort[query.sort.substring(1)] = 'desc';
            } else {
                sort[query.sort] = 'asc';
            }
        }
        if (query.key) {
            Search.name = new RegExp(query.key, 'i');
        }
        var limit = parseInt(query.limit) || 2;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;
        return Product.find(Search).select('name description image price').sort(sort).limit(limit).skip(skip).exec();
    },
    getOne: function (id) {
        return Product.findById(id);
    },
    getByName: function (name) {
        return Product.findOne({ name: name }).exec();
    },
    createProduct: function (product) {
        return new Product(product).save();
    },
    editProduct:function(id,newProduct){
        return Product.findByIdAndUpdate(id,newProduct, { returnDocument: 'after' });
    },
    deleteProduct:function(id){
        return Product.findByIdAndDelete(id, { returnDocument: 'after' });
    }
};