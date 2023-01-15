const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get("/",ProductController.getAllProducts);
router.post("/",ProductController.createProduct);
router.get("/:id",ProductController.getProductById);
router.put("/:id",ProductController.updateProduct);
router.delete("/:id",ProductController.deleteProduct);
router.post("/:id/likes",ProductController.likeProduct);

module.exports = router;