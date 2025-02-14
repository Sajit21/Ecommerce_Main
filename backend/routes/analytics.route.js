import express from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware"
import { GetAnaylticData } from "../controllers/analytics.controller"
import router from "./coupon.route";


const router= express.Router();




router.get("/",protectRoute,adminRoute,async(req,res)=>{

    try{
        const analyticsData =await GetAnaylticData();
    }
    catch(error){




    }
}
)

export default router