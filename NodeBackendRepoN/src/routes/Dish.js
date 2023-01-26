import Router from "express";
import { createDish } from "../controllers/dish/create.js";
import { getAllDishes } from "../controllers/dish/getAllDishes.js";

const router = Router();

router.post("/create", createDish);
router.get("/all/:onlyInStock", getAllDishes);

export default router;