const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.listProducts);
router.get("/new", productController.newProductForm);
router.post("/", productController.createProduct);
router.get("/:id/edit", productController.editProductForm);
router.post("/:id", productController.updateProduct);
router.post("/:id/delete", productController.deleteProduct);

module.exports = router;
