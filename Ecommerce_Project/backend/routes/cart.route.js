 import express from "express";
 import {addToCart, removeAllFromCart,getCartProducts} from "../controllers/cart.controller.js"
 import { protectRoute } from "../middleware/auth.middleware.js";


 const router = express.Router()

router.get("/", protectRoute, getCartProducts)
 router.post("/",protectRoute, addToCart)
router.delete("/",protectRoute,removeAllFromCart)
// router.out("/:id",protectRoute,updateQuantity )

 export default router