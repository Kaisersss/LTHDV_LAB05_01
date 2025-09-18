const Supplier = require("../models/Supplier");

// Display list of all suppliers
exports.listSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render("suppliers/index", { suppliers });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Display form to create a new supplier
exports.newSupplierForm = (req, res) => {
  res.render("suppliers/new");
};

// Handle creating a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Display form to edit a supplier
exports.editSupplierForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).send("Supplier not found");
    }
    res.render("suppliers/edit", { supplier });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle updating a supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Handle deleting a supplier
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect("/suppliers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
