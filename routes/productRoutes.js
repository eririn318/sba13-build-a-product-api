const express = require("express");
const {
  createProduct,
  getProductById,
  updatedProduct,
  deleteProduct,
  filterProduct,
  sortProduct,
  paginatedProduct,
  getAllProducts,
} = require("../controllers/productControllers");

const router = express.Router();

//create
router.post("/", createProduct);

//filter
router.get("/filter", filterProduct);

//sort
router.get("/sort", sortProduct);

//pagination
router.get("/pagination", paginatedProduct);

//get all product
router.get("/", getAllProducts);

//get product by id
router.get("/:id", getProductById);

//update
router.put("/:id", updatedProduct);

//delete
router.delete("/:id", deleteProduct);

module.exports = router;
