import React from 'react';
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const TodaysOffer = () => {
	const { productsArray } = useContext(ProductContext);
	if (productsArray.length >= 1) {
		return (
			<div className="text-center border-b container mx-auto">
				<p className="text-2xl mt-8">Today&apos;s Offers</p>
				<hr width="50%" className="ml-auto mr-auto" />
				<div className="grid grid-cols-2 gap-4 mt-4 text-center px-6 text-sm">
					{productsArray.map((product) => {
						return (
							<ProductCard product={product} key={product.id} />
						);
					})}
				</div>
				<button className="bg-green-500 text-white px-3 py-1 m-2 rounded-md shadow-md z-50">
					See all offers
				</button>
			</div>
		);
	}
};

export default TodaysOffer;
