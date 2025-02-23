 import express from "express";
 import {addToCart, removeAllFromCart,getCartProducts, updateQuantity, deleteAllFromCart} from "../controllers/cart.controller.js"
 import { protectRoute } from "../middleware/auth.middleware.js";


 const router = express.Router()

router.get("/", protectRoute, getCartProducts)
 router.post("/",protectRoute, addToCart)
 router.get('/deletecart',protectRoute,deleteAllFromCart);
router.delete("/:id",protectRoute,removeAllFromCart)
router.put("/:id",protectRoute,updateQuantity )

 export default router