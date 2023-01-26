import Router from "express";
import { saveOrder } from "../controllers/order/saveOrder.js";
import { getOrder } from "../controllers/order/getOrder.js";
import { getOrdersByUser } from "../controllers/order/getOrdersByUser.js";
import { getAllOrders } from "../controllers/order/getAllOrders.js";

const router = Router();

router.post("/create", saveOrder);
router.post("/history", getOrdersByUser)
router.post("/all", getAllOrders)

router.post("/:orderId", getOrder);


export default router;