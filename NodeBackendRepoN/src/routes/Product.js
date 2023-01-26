import Router from "express";

const router = Router();
import { getAllProducts } from "../controllers/product/getAllProducts.js";
import { getProductBySlug } from "../controllers/product/getProductBySlug.js";
import { createProduct } from "../controllers/product/createProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { searchProduct } from "../controllers/product/searchProduct.js";

router.post("/all", getAllProducts);
router.post("/create",createProduct)
router.post("/update",updateProduct)
router.post('/search/:input',searchProduct)
router.post('/:slug',getProductBySlug)

export default router;