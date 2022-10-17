import React from 'react';
import ProductCard from './ProductCard';
import { SearchContext } from '../contexts/SearchContext';
import { ProductContext } from '../contexts/ProductContext';
import { useContext } from 'react';

const BrowsedProducts = () => {
	const { productsArray } = useContext(ProductContext);
	const { searchValue } = useContext(SearchContext);
	if (productsArray.length >= 1) {
		const product = productsArray.filter((key) =>
			key.name
				.toLocaleLowerCase()
				.includes(searchValue.toLocaleLowerCase())
		);
		return (
			<>
				{searchValue.length >= 1 ? (
					<div className="flex flex-col items-center mt-4 border-b mb-20">
						{product.length === 0 ? (
							<p className="-mb-4 text-xs">
								We could not find what you are looking for
							</p>
						) : (
							<p className="-mb-4 text-xs">
								We found you some products
							</p>
						)}

						<div className="grid grid-cols-2 gap-2 text-center mt-6 px-4">
							{product.map((product) => {
								return (
									<ProductCard
										key={product.id}
										product={product}
									/>
								);
							})}
						</div>
						{product.length === 0 ? (
							<div className="flex">
								<button className="bg-green-500 text-white px-3 py-1 m-2 rounded-md shadow-md">
									All products
								</button>
							</div>
						) : (
							<div className="flex mt-10">
								<button className="bg-green-500 text-white px-3 py-1 m-2 rounded-md shadow-md">
									Related products
								</button>
								<button className="bg-green-500 text-white px-3 py-1 m-2 rounded-md shadow-md">
									All products
								</button>
							</div>
						)}
					</div>
				) : (
					''
				)}
			</>
		);
	}
};

export default BrowsedProducts;
