import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useCartStore } from "../stores/useCartStore";

const categories = [
	{ href: "/Chair", name: "Chair", imageUrl: "/Chair.png" },
	{ href: "/cpu", name: "cpu", imageUrl: "/cpu.png" },
	{ href: "/Headphone", name: "Headphone", imageUrl: "/Headphone.png" },
	{ href: "/keyboard", name: "keyboard", imageUrl: "/keyboard.png" },
	{ href: "/Laptop", name: "Laptop", imageUrl: "/Laptop.png" },
	{ href: "/Mouse", name: "Mouse", imageUrl: "/Mouse.png" },
	// { href: "/Console", name: "Console", imageUrl: "/Console.png" },
];

const HomePage = () => {
	// const { fetchFeaturedProducts, products, isLoading } = useProductStore();
       const {getCartItems}=useCartStore()
	useEffect(() => {
		getCartItems()
	}, [getCartItems]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore The Best
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
        Power up your play with the latest in sustainable gaming gear				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{/* {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />} */}
			</div>
		</div>
	);
};
export default HomePage;

// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage;



