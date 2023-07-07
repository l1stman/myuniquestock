const router = require("express").Router();

// controllers
const productscontroller = require("../../controllers/productscontroller");

router.post("/stock/products", productscontroller.productslist);
router.post(
  "/stock/products/getallcategories",
  productscontroller.productsgetAllCategories
);
router.post("/stock/products/search", productscontroller.productsearch);
router.post(
  "/stock/products/search/slug",
  productscontroller.productsearchbyslug
);
router.post("/stock/products/filtred", productscontroller.productslistfiltred);
router.post("/stock/products/create", productscontroller.productcreate);
router.put("/stock/products/edit", productscontroller.productedit);
router.delete("/stock/products/delete", productscontroller.productdelete);
module.exports = router;
