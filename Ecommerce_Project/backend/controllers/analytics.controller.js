import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const GetAnaylticData=async()=>{

   const totalUsers= await User.countDocuments();
   const totalProducts= await Product.countDocuments();


   const salesData = await Order.aggregate([

    {
        $group: {


            _id:null,//sabai data lai access garna payo
            totalsales: {$sum:1},   //Count the number of orders for each user
             totalRevenue: {$sum:"totalAmount"}
        }
    
    }
   ])




}


