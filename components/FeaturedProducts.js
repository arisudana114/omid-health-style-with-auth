import React from 'react';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Link from 'next/link';

const FeaturedProducts = () => {
	const { productsArray } = useContext(ProductContext);

	if (productsArray.length >= 1) {
		const featured = productsArray.filter((key) => key.isFeatured);
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
				<p className="text-2xl mt-8">Featured Products</p>
				<hr width="50%" className="ml-auto mr-auto" />
				<div className="grid grid-cols-2 gap-4 mt-4 text-center px-6 text-sm md:grid-cols-5">
					{featured
						.sort(() => 0.5 - Math.random())
						.slice(0, 5)
						.map((product) => {
							return (
								<ProductCard
									product={product}
									key={product.id}
								/>
							);
						})}
				</div>
				<Link href={'/all-products'}>
					<button className="outline outline-2 outline-white my-4 text-white px-3 py-1 m-2 rounded-md shadow-md hover:text-green-400 hover:outline-green-400 z-50">
						See all products
					</button>
				</Link>
			</div>
		);
	}
};

export default FeaturedProducts;
