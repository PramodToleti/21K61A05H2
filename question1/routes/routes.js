const {
  getProductsByCategory,
  getProductDetails,
} = require("../controllers/controller");

const router = require("express").Router();

router.get("/categories/:categoryname/products", getProductsByCategory);

router.get("/categories/:categoryname/products/:productid", getProductDetails);

module.exports = router;
