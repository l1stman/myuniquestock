const Product = require("../database/schemas/products");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");
const isImage = require("is-image");

exports.productcreate = async (req, res) => {
  var { name, description, image, category, quantity } = req.body;

  if (!name || name.length < 3)
    return res.json({
      success: false,
      message: "Name should be at least 3 characters long",
    });
  if (!description || description.length <= 18)
    return res.json({
      success: false,
      message: "Description must contain more than 18 characters.",
    });
  if (!image)
    return res.json({
      success: false,
      message: "Invalid Image URL or not an image file!",
    });

  const isLinkImage = isImage(image);
  if (!isLinkImage)
    return res.json({
      success: false,
      message: "Invalid Image URL or not an image file!",
    });

  const randomId = uuidv4();
  const slug = slugify(name, {
    lower: true,
    strict: true,
  });

  Product.create({
    id: randomId,
    name: name,
    description: description,
    image: image,
    category: !category ? null : category,
    quantity: !quantity ? 0 : quantity,
    slug: slug,
  })
    .then((doc) => {
      res.json({
        success: true,
        message: "Product created successfully!",
        doc: doc,
      });
    })
    .catch((error) => {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        // Handle duplicate name error
        res.json({
          success: false,
          message:
            "Product with the same name already exists. Please choose a different name.",
        });
      } else {
        // Handle other errors
        res.json({
          success: false,
          message: "An error occurred while creating the product.",
          error: error,
        });
      }
    });
};

exports.productedit = async (req, res) => {
  var { id, name, description, category, quantity, image, slug } = req.body;
  // Product.findOneAndUpdate(
  //   {
  //     id: id,
  //   },
  //   {
  //     [edit]: value,
  //     editedAt: Date.now(),
  //   },
  //   { new: true } // Set the option to return the updated document
  // )

  if (!name || name.length < 3) {
    return res.json({
      success: false,
      message: "Name should be at least 3 characters long",
    });
  }
  if (!description || description.length <= 18)
    return res.json({
      success: false,
      message: "Description must contain more than 18 characters.",
    });
  if (!slug || slug.length < 3)
    return res.json({
      success: false,
      message: "Slug must contain more than 3 characters.",
    });
  if (!image)
    return res.json({
      success: false,
      message: "Invalid Image URL!",
    });

  const isLinkImage = isImage(image);
  if (!isLinkImage)
    return res.json({
      success: false,
      message: "Invalid Image URL!",
    });

  Product.findOneAndUpdate(
    {
      id: id,
    },
    {
      name,
      description,
      category,
      quantity,
      image,
      slug,
    },
    { new: true }
  ).then((doc) => {
    if (!doc) {
      return res.json({
        success: false,
        message: "Invalid Product!",
      });
    } else
      res.json({
        success: true,
        message: "Product edited successfully!",
        doc: doc,
      });
  });
};

exports.productdelete = async (req, res) => {
  var { id } = req.body;
  Product.findOneAndDelete({ id: id }).then((doc) => {
    if (!doc) {
      return res.json({
        success: false,
        message: "Invalid Product!",
      });
    } else {
      res.json({
        success: true,
        message: "Product Deleted successfully!",
      });
    }
  });
};

exports.productslist = async (req, res) => {
  Product.find()
    .then((products) => {
      if (products.length === 0) {
        res.json({
          success: true,
          message: "No products found.",
          docs: [],
        });
      } else {
        res.json({
          success: true,
          message: "Products retrieved successfully!",
          docs: products,
        });
      }
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "An error occurred while retrieving the products",
        error: error,
      });
    });
};
exports.productslistfiltred = (req, res) => {
  const { type, value } = req.query;
  Product.find({
    [type]: value,
  })
    .then((products) => {
      if (products.length === 0) {
        res.json({
          success: true,
          message: "No products found.",
          docs: [],
        });
      } else {
        res.json({
          success: true,
          message: "Products retrieved successfully!",
          docs: products,
        });
      }
    })
    .catch((error) => {
      res.json({
        error: "Something went wrong",
        error: error,
      });
    });
};

exports.productsgetAllCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.json({
        success: true,
        categories: categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    });
};
exports.productsearch = async (req, res) => {
  const { searchTerm } = req.body;

  await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .then((docs) => {
      if (docs.length === 0) {
        return res.json({
          success: false,
          message: "I can't find this product",
        });
      } else {
        res.json({
          success: true,
          message: "Products Founded Successfully!",
          docs: docs,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    });
};
exports.productsearchbyslug = async (req, res) => {
  const { slug } = req.body;
  Product.findOne({ slug: slug })
    .then((doc) => {
      if (!doc)
        return res.json({
          success: false,
          message: "I can't find this product",
        });
      else {
        res.json({
          success: true,
          message: "Product Founded Successfully!",
          doc: doc,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    });
};
