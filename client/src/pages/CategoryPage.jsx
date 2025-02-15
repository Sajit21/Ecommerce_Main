import React from 'react'
import { useProductStore } from '../stores/useProductStore'
import { useEffect } from 'react'
const CategoryPage = () => {
    const {fetchProdductsByCategory,products} = useProductStore()
   useEffect(()=>{
        fetchProdductsByCategory(),[fetchProdductsByCategory]
   }
   )

   console.log("products",products)
  
  
  
    return (
    <div>CategoryPage</div>
  )
}

export default CategoryPage
