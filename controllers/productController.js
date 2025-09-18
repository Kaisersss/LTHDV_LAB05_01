const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

// Display list of all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("supplierId");
    res.render("products/index", { products });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Display form to create a new product
exports.newProductForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("products/new", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle creating a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, address, phone, supplierId } = req.body;
    const product = new Product({ name, address, phone, supplierId });
    await product.save();
    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Display form to edit a product
exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("products/edit", { product, suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle updating a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, address, phone, supplierId } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      address,
      phone,
      supplierId,
    });
    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle deleting a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
