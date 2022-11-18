import React from 'react';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Link from 'next/link';

const FeaturedProducts = () => {
	const { productsArray } = useContext(ProductContext);

	if (productsArray.length >= 1) {
		// return (
		// 	<div>
		// 		<div className="flex flex-col items-center px-6 text-sm mb-10 container mx-auto">
		// 			<p className="text-2xl mt-8">Featured Products</p>
		// 			<hr width="50%" className="ml-auto mr-auto" />
		// 			<div className="grid grid-cols-2 gap-4 mt-4 text-center px-6 text-sm md:grid-cols-5">
		// 				{featured.map((product) => {
		// 					return (
		// 						<ProductCard
		// 							product={product}
		// 							key={product.id}
		// 						/>
		// 					);
		// 				})}
		// 			</div>
		// 		</div>
		// 	</div>
		// );
		return (
			<div className="text-center border-b container mx-auto mb-20">
				<p className="text-2xl mt-8">All Products</p>
				<hr width="50%" className="ml-auto mr-auto" />
				<div className="grid grid-cols-2 gap-4 mt-4 text-center px-6 text-sm md:grid-cols-5">
					{productsArray.map((product) => {
						return (
							<ProductCard product={product} key={product.id} />
						);
					})}
				</div>
			</div>
		);
	}
};

export default FeaturedProducts;
