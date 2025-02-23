
import Product from '../models/product.model.js'

export const addToCart=async(req,res)=>{
    const{productId}=req.body;
    const user=req.user;
    try{
            const existingProduct=user.cartItems.find(item=>item.product===productId)

            if(existingProduct){
                existingProduct.quantity+=1;
            }else{
                user.cartItems.push({product:productId});
            }
            await user.save();
            res.json({message:"Product added to cart successfully"});

    }catch(err){
        console.log('Error in addToCart',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const removeAllFromCart = async(req,res )=>{
    
    try{
        const {id} =req.params;
        const user=req.user;
        if(!id)
        {
            user.cartItems=[]
    }
    else{
        user.cartItems =user. cartItems.filter((item)=> item.id !== id);

    }
    await user.save();
    res.json(user.cartItems);

}
catch(error){
    res.status(500).json({message :" server error" , error: error.message})

    }
}

export const updateQuantity=async(req,res) =>{
try{

    const {id}=req.params;
    console.log(id)
    const {quantity} = req.body;
    console.log(quantity)
    const user= req.user;
    // console.log(id)
    const existingItem =user.cartItems.find((item) =>item.product.toString()===id);
    // console.log(existingItem)
    // const item=user.cartItems.forEach((item)=>console.log(item))
    if(existingItem){
        if(quantity === 0){
            user.cartItems=user.cartItems.filter((item)=>item.product.toString()!==id);
            console.log(user.cartItems)
            await user.save()
 
         return res.json(user.cartItems)       
       }
       existingItem.quantity=quantity;
       await user.save()
       res.json(user.cartItems)
    }else{
        res.status(404).json({message: "product not found"})

    }
}
catch(error){
    console.log("error in updateQuantity controller", error.message)

   res.status(500).json({message: "server error ", error: error.message}) 
}
}

export const deleteAllFromCart=async(req,res)=>{
    try{
        const user=req.user;
        user.cartItems=[];
        await user.save();
        res.json(user.cartItems);
    }catch(err){
        console.log('Error in deleteAllFromCart',err.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getCartProducts = async(req, res)=>{
try {
        const productIds = req.user.cartItems.map(item => item.product);

    const products = await Product.find({ _id: { $in: productIds} });
    const cartItems=products.map((product)=>{
        const item=req.user.cartItems.find((cartItem)=>cartItem.product.equals(product._id));
        return {...product.toJSON(),quantity: item.quantity};
    })
    res.json(cartItems)
} catch (error) {
    console.log("error in getcartProducts controller", error.message);
        res.status(500).json({message: "server error", error: error.message})   
}
}








    





