const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");

const { getSingleProductReviews } = require("../controllers/reviewController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);
router
  .route("/:id")
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .get(getSingleProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
