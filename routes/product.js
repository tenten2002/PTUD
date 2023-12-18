var express = require('express');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelProduct = require('../models/product'); // Update to use the product model
var validate = require('../validates/product'); // Update to use the product validation
const { validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  console.log(req.query);
  var productsAll = await modelProduct.getAll(req.query); // Update to use the product model function
  responseData.responseReturn(res, 200, true, productsAll);
});

router.get('/:id', async function (req, res, next) { // get by ID
  try {
    var product = await modelProduct.getOne(req.params.id); // Update to use the product model function
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy sản phẩm");
  }
});

router.post('/add', validate.validator(),
  async function (req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }
    var existingProduct = await modelProduct.getByName(req.body.name); // Update to use the product model function
    if (existingProduct) {
      responseData.responseReturn(res, 404, false, "Sản phẩm đã tồn tại");
    } else {
      const newProduct = await modelProduct.createProduct({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price
      });
      responseData.responseReturn(res, 200, true, newProduct);
    }
  });

router.put('/edit/:id', async function (req, res, next) {
  try {
    console.log(req.params.id)
    console.log(req.body)
    var product = await modelProduct.editProduct(req.params.id, req.body); // Update to use the product model function
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, error);
  }
});

router.delete('/delete/:id', async function (req, res, next) { // delete by Id
  try {
    var product = await modelProduct.deleteProduct(req.params.id); // Update to use the product model function
    responseData.responseReturn(res, 200, true, "Xóa thành công");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy sản phẩm");
  }
});

module.exports = router;
