import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckOutSession } from "../controllers/payment.controller.js";
// import { stripe } from "../lib/stripe.js";
// import Coupon from "../models/coupon.model.js";
// import Order from "../models/order.model.js"


const router =express.Router();
router.post("/create_checkout-session",protectRoute,createCheckOutSession)
router.post("/checkout-success",protectRoute,checkoutSuccess)



export default router;