import Coupon from "../models/coupon.model.js"
import {stripe} from "../lib/stripe.js"
import Order from "../models/order.model.js"



export const createCheckOutSession= async(req ,res)=>{
    try {

        //simply body bata data liyo ra certain authroize garyo
        const {products,couponCode}= req.body;
        if(!Array.isArray(products) || products.length===0)
            //hamro products haru array format ma chaina bhani ra tesko length
{
    return res.status(400).json({error: "Invalid or empty products array"})
}    
let totalAmount=0;
const lineItems  = products.map(product => {
    const amount = Math.round(product.price * 100)  //just gives the amount in cents
    totalAmount += amount * product.quantity

    return{
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                image:[product.image]
            },
            unit_amount: amount
        }
    }
})

    let coupon= null
    if(couponCode)
    {
        coupon= await Coupon.findOne({code:couponCode,userId:req.user._id,isActive:true})
        if(coupon){
            totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100)
        }
    }
    
    const session= await stripe.checkout.session.create({
        payment_method_type:["card"],
        line_items: lineItems,
        mode: "payment", //indicating the one time code
        success_url:`${process.env.CLIENT_URL}/purachase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
        discounts: coupon
        ?[ 
            {
                coupon: await createStripeCoupon(coupon.discountPercentage),

            },
        ]
        :[],
        metadata:{ //add additional information to the payment itself 
            userId:req.user._id.toString(),
            couponCode:couponCode || "",
            products: JSON.stringify(
                products.map((p)=>({
             id: p._id,
             quantity: p.quantity,
             price: p.price

                })
            )
            )

        }
    });
    if(totalAmount>=20000){
        await createNewCoupon(req.user._id)
    }
    res.status(200).json({id:session.id, totalAmount:totalAmount /100});
    } catch (error) {
        res.status(500).json({message:"server error", error:error.message})     
        
    }
    }

async function createStripeCoupon(discountPercentage){
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    })

    return coupon.id;

}

async function createNewCoupon(userId){
    const newCoupon = new Coupon({
        code:"GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),
        //Base-36 includes numbers (0-9) and letters (a-z), making it a compact alphanumeric representation.
        discountPercentage:10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ),
        userId:userId


    })

    await newCoupon.save();
}


export const checkoutSuccess=async(req ,res)=>{


    try {
        const {sessionId}=req.body;
        const session= await stripe.checkout.sessions.retrive(sessionId) //retrieving the session id
        //used to fetch the details of that specific session from Stripe
        if(session.payment_status=== "paid"){
            if(session.metadata.coupon)
            {
                await Coupon.findOneAndUpdate({
                    code:session.metadata.couponCode,
                    userId:session.metadata.userId
                },{
                    isActive:false
                })
            }
        }



         //create new order

        const products= JSON.parse(session.metadata.products)
       const newOrder = new Order({
        user:session.metadata.userId,
        products: products.map(product => ({
            product: product.id,
            quantity: product.id,
            quantity: product.quantity,
            price: product.price
        })),
        totalAmount: session.amount_total/100,
     stripeSessionId: sessionId
       })
     await newOrder.save();

     res.status(200).json({success:true, message:" payment successful , order created and coupon deactivated if used", orderId: newOrder._id})

        
    } catch (error) {
        console.log("error processing successful checkout", error)
        res.status(500).json({message: "error processing successful checkout", error:error.message})
        
    }



}






