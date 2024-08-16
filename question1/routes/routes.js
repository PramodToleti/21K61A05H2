const { getProductsByCategory } = require("../controllers/controller");

const router = require("express").Router();

router.get("/categories/:categoryname/products", getProductsByCategory);

module.exports = router;
