import React from 'react';
import ProductCard from './ProductCard';
import { SearchContext } from '../contexts/SearchContext';
import { ProductContext } from '../contexts/ProductContext';
import { useContext } from 'react';
import Link from 'next/link';

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
							<p className="-mb-4 text-xs md:text-lg">
								We could not find what you are looking for
							</p>
						) : (
							<p className="-mb-4 text-xs md:text-lg">
								We found you some products
							</p>
						)}

						<div className="grid grid-cols-2 gap-2 text-center mt-6 px-4 md:grid-cols-5 md:gap-4">
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
								<button className="outline outline-2 outline-white my-4 text-white px-3 py-1 m-2 rounded-md shadow-md hover:text-green-400 hover:outline-green-400">
									See all products
								</button>
							</div>
						) : (
							<div className="flex mt-10">
								<button className="outline outline-2 outline-white my-4 text-white px-3 py-1 m-2 rounded-md shadow-md hover:text-green-400 hover:outline-green-400">
									Related products
								</button>
								<Link href={'/all-products'}>
									<button className="outline outline-2 outline-white my-4 text-white px-3 py-1 m-2 rounded-md shadow-md hover:text-green-400 hover:outline-green-400">
										See all products
									</button>
								</Link>
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
