export const addToCart =async( req ,res ) =>{
try{
    const {productId} =req.body;
    const user = req.user ;
    const existingItem =user.cartItems.find(item=> item.id === production);
    if(existingItem){ 
        //check whether product exist or not and if yes increase the product
        existingItem.quantity +=1
    
    }
    else{
        user.cartItems.push(productId)
        //if the items haven't been selected , push the product by id
        res.json(user.cartItems) //displays what is added 
}
}
catch(error)
{
    console.log("error in addToCart controller", error.message)
    res.status(500).json({messgae: "server error", error: error.message})
}
}

export const removeAllFromCart = async(req,res )=>{
    try{
        const {productId} =req.body;
        const user=req.user;
        if(!productId)
        {
            user.cartItems=[]
    }
    else{
        user.cartItems =user. cartItems.filter((item)=> item.id !== productId);

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

    const {id: productId}=req.params;
    const {quantity} = req.body;
    const user= req.user;
    const existingItem =user.cartItem.find((item) =>item.id != productId);
    if(existingItem){
        if(quantity === 0){
            user.cartItems=user.cartItems.filter((item)=>item.id !== productId)
            await user.save()
 
         return res.json(user.cartItems)       
       }
    }else{
        res.status(404).json({message: "product not found"})

    }
}
catch(error){
    console.log("error in updateQuantity controller", error.message)

   res.status(500).json({message: "server error ", error: error.message}) 
}
}

export const getCartProducts = async(req, res)=>{
try {

    const cartItems=products.map((products)=>{
        const items= req.user.cartItems.find((cartItem) => cartItem.id === product.id);
        return {...product.toJSON(),quantity: item.quantity};
    })
    res.json(cartItems)
} catch (error) {
    console.log("error in getcartProducts controller", error.message);
        res.status(500).json({message: "server error", error: error.message})
    
    
}





    
}





