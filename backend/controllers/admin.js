const Product = require("../models/Product");
const User = require("../models/User");

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });
    console.log(productDocs);
    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.approveProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Produt Not found");
    }
    productDoc.status = "approve";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product is approved",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.rejectProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Produt Not found");
    }
    productDoc.status = "reject";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product was rejected",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.rollbackProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findById(id);

    if (!productDoc) {
      throw new Error("Produt Not found");
    }
    productDoc.status = "pending";
    await productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product was rollback",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const UserDocs = await User.find()
      .select("name email role createdAt status")
      .sort({ createdAt: -1 });
    console.log(UserDocs);
    return res.status(200).json({
      isSuccess: true,
      UserDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.banUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await User.findById(id);

    if (!userDoc) {
      throw new Error("user Not found");
    }
    userDoc.status = "banned";
    await userDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "user was banned",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.unbanUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await User.findById(id);

    if (!userDoc) {
      throw new Error("user Not found");
    }
    userDoc.status = "active";
    await userDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "user was unbanned",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
