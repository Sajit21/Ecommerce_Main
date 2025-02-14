// import express from "express";
// import {
// 	createProduct,
// 	deleteProduct,
// 	getAllProducts,
// 	getFeaturedProducts,
// 	getProductsByCategory,
// 	getRecommendedProducts,
// 	toggleFeaturedProduct,
// } from "../controllers/product.controller.js";
// import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", protectRoute, adminRoute, getAllProducts);
// router.get("/featured", getFeaturedProducts);
// router.get("/category/:category", getProductsByCategory);
// router.get("/recommendations", getRecommendedProducts);
// router.post("/", protectRoute, adminRoute, createProduct);
// router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
// router.delete("/:id", protectRoute, adminRoute, deleteProduct);

// export default router;

import express from "express";
import { getAllProducts,getFeaturedProducts,toggleFeaturedProduct,getProductsByCategory,getRecommendedProducts,createProduct,deleteProduct } from "../controllers/product.controller.js"
import {adminRoute, protectRoute} from "../middleware/auth.middleware.js"


const router=express.Router();
router.get('/',protectRoute, adminRoute,getAllProducts) 
router.get("/category/:category", getProductsByCategory);

router.get('/featured',getFeaturedProducts) 
router.get('/recommmendation',getRecommendedProducts) 
router.patch("/:id", protectRoute,adminRoute,toggleFeaturedProduct) 

router.post("/",protectRoute, adminRoute,createProduct)
router.delete("/:id",protectRoute,adminRoute,deleteProduct)

//paila hamro protectROute ko function check huncha ani adminROute then only we can go for getAllProducts

export default router 