import Router from 'express'
import User from './User.js'
import Order from './Order.js'
import Product from './Product.js'
import Entry from './Entry.js'
import Dish from './Dish.js'

const router = Router();

router.use("/user",User)
router.use("/order",Order)
router.use("/product",Product)
router.use("/entry",Entry)

//Restaurant App
router.use("/dish",Dish)

export default router
