require("dotenv").config();
const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const SavedProduct = require("../models/SavedProduct");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "da2xt5ryb",
  api_key: "932895679949546",
  api_secret: process.env.CLOUD_API,
});

exports.addNewProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_used_for,
    product_details,
  } = req.body;

  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      price: product_price,
      category: product_category,
      usedFor: product_used_for,
      details: product_details,
      seller: req.userId,
    });
    return res.status(201).json({
      isSuccess: true,
      message: "Product added to sell list",
      productDoc,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });
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

exports.getOldProduct = async (req, res) => {
  try {
    const productDoc = await Product.findOne({ _id: req.params.id });

    return res.status(200).json({
      isSuccess: true,
      productDoc,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  try {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
      product_used_for,
      product_details,
      seller_id,
      product_id,
    } = req.body;

    if (req.userId.toString() !== seller_id) {
      throw new Error("Authorization Failed");
    }

    const productDoc = await Product.findOne({ _id: product_id });
    productDoc.name = product_name;
    productDoc.category = product_category;
    productDoc.price = product_price;
    productDoc.description = product_description;
    productDoc.usedFor = product_used_for;
    productDoc.details = product_details;
    productDoc.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product details updated",
      productDoc,
    });
  } catch (error) {
    return res.status(422).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await Product.findOne({ _id: id });

    if (!productDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found",
      });
    }

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Authorization Failed");
    }

    if (productDoc.images && Array.isArray(productDoc.images)) {
      const deletePromise = productDoc.images.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );

        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) {
              reject(new Error("Destroy Failed"));
            } else {
              console.log(result);
              resolve(result);
            }
          });
        });
      });

      await Promise.all(deletePromise);
    }

    await Product.findByIdAndDelete(id);
    return res.status(202).json({
      isSuccess: true,
      message: "Product deleted",
      productDoc,
    });
  } catch (error) {
    return res.status(202).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

//uploadImage
exports.uploadProductImages = async (req, res) => {
  const productImages = req.files;
  console.log(productImages);
  const productId = req.body.product_id;
  let secureUrlArray = [];

  try {
    productImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (err, result) => {
        if (!err) {
          const url = result.secure_url;
          secureUrlArray.push(url);

          if (productImages.length === secureUrlArray.length) {
            await Product.findByIdAndUpdate(productId, {
              $push: { images: secureUrlArray },
            });
            return res.status(200).json({
              isSuccess: true,
              message: "Product images saved",
              secureUrlArray,
            });
          }
        } else {
          throw new Error("Cloud Upload Failed");
        }
      });
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getSavedImages = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await Product.findById(id).select("images");
    if (!productDoc) {
      throw new Error("Product not found");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "Product images are fetched",
      data: productDoc,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteProductImages = async (req, res) => {
  try {
    const productId = req.params.productId;
    const decodeImgToDelete = decodeURIComponent(req.params.imgToDelete);

    await Product.findByIdAndUpdate(productId, {
      $pull: { images: decodeImgToDelete },
    });

    const publicId = decodeImgToDelete.substring(
      decodeImgToDelete.lastIndexOf("/") + 1,
      decodeImgToDelete.lastIndexOf(".")
    );
    await cloudinary.uploader.destroy(publicId);

    return res.status(200).json({
      isSuccess: true,
      message: "Image destroyed",
    });
  } catch (error) {
    return res.status(404).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.savedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await SavedProduct.create({
      user_id: req.userId,
      product_id: id,
    });

    return res.status(200).json({
      isSuccess: true,
      message: "product saved",
    });
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
