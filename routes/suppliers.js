const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.listSuppliers);
router.get("/new", supplierController.newSupplierForm);
router.post("/", supplierController.createSupplier);
router.get("/:id/edit", supplierController.editSupplierForm);
router.post("/:id", supplierController.updateSupplier);
router.post("/:id/delete", supplierController.deleteSupplier);

module.exports = router;
