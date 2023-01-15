const Product = require('../models/Product');
const RESPONSE = require('../message/message');

module.exports = {

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();

            if (products.length > 0) {
                return res.json({message: RESPONSE.OK, status: RESPONSE.SUCCESS, data: products});
            } else {
                return res.json({
                    message: RESPONSE.DATA_NOT_FOUND,
                    statusCode: RESPONSE.NOT_FOUND,
                    status: RESPONSE.FAILURE
                });
            }

        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },
    createProduct: async (req, res) => {
        try {
            const {name, title, image, likes,admin_id} = req.body;

            console.log(admin_id)

            if (!name || !title || !image) {
                return res.json({message: RESPONSE.ALL_FIELDS_REQUIRED, status: RESPONSE.FAILURE});
            } else {
                const saveProduct = await Product.create({name, title, image, likes,admin_id});
                return res.json({message: RESPONSE.CREATE_MESSAGE, status: RESPONSE.CREATED, data: saveProduct});
            }

        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },
    getProductById: async (req, res) => {
        try {
            const productId = req.params.id;

            const product = await Product.findById(productId);

            if (product) {
                return res.json({message: RESPONSE.OK, status: RESPONSE.SUCCESS, data: product});
            } else {
                return res.json({
                    message: RESPONSE.DATA_NOT_FOUND,
                    statusCode: RESPONSE.NOT_FOUND,
                    status: RESPONSE.FAILURE
                });
            }

        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            const {name, title, image, likes} = req.body;

            if (!name || !title || !image) {
                return res.json({message: RESPONSE.ALL_FIELDS_REQUIRED, status: RESPONSE.FAILURE});
            }

            product.name = name;
            product.title = title;
            product.image = image;
            product.likes = likes;

            const updateProduct = await product.save();

            return res.json({message: RESPONSE.UPDATE_PRODUCT, status: RESPONSE.SUCCESS, data: updateProduct});

        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const isDelete = await Product.deleteOne({_id: req.params.id});

            if (isDelete.deletedCount > 0) {
                return res.json({message: RESPONSE.DELETE_PRODUCT, status: RESPONSE.DELETED});
            } else {
                return res.json({message: RESPONSE.BAD_REQUEST_MESSAGE, status: RESPONSE.BAD_REQUEST});
            }


        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },
    likeProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);

            if (!product) {
                return res.json({
                    message: RESPONSE.DATA_NOT_FOUND,
                    statusCode: RESPONSE.NOT_FOUND,
                    status: RESPONSE.FAILURE
                });
            }

            product.likes++

            const saveProduct = await product.save();
            return res.json({message: RESPONSE.CREATE_MESSAGE, status: RESPONSE.CREATED, data: saveProduct});

        } catch (err) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    }


}