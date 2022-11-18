import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import Product from '../../models/Product';

import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import Image from 'next/image';

const ProductScreen = ({ products }) => {
	const { query } = useRouter();
	const { slug } = query;

	const product = products.find((product) => product.slug === slug);
	console.log(product);
	return (
		<Layout>
			<div className="container bg-[#3d3a3a] m-4 p-6 rounded-2xl">
				<p className="text-4xl font-bold mb-4">{product.name}</p>
				<div className="grid grid-cols-6 gap-4">
					<div className="col-span-2">
						<Image
							src={product.image[0]}
							alt={product.slug}
							width={500}
							height={500}
						/>
					</div>
					<div className="col-span-3 px-6 flex flex-col justify-between">
						<div>
							<p className="text-xl font-bold">
								Available quantities
							</p>
							<p>Please choose one</p>
							<div className="flex font-bold justify-between w-[35%] py-4">
								{product.quantity.map((q) => {
									return (
										<button
											className="outline outline-2 outline-green-500 px-4 py-1 rounded-md"
											key={q}
										>
											{q}
										</button>
									);
								})}
							</div>
						</div>
						<div>
							<p className="text-xl font-bold">Price</p>
							<span className="text-lg">Rp. </span>
							<span className="text-4xl">{product.price[0]}</span>
						</div>
						<div>
							<p className="text-xl font-bold">Description</p>
							<p>{product.description}</p>
						</div>
						<div className="mt-auto">
							<div className="flex justify-between items-center w-full m-2 md:w-[20%]">
								<button className="font-bold text-gray-700 rounded-full bg-green-500 flex items-center justify-center font-mono w-[2rem] h-[2rem]">
									&#8722;
								</button>
								<p>x 1</p>
								<button className="font-bold text-gray-700 rounded-full bg-green-500 flex items-center justify-center font-mono w-[2rem] h-[2rem]">
									&#43;
								</button>
							</div>
							<div className="flex font-bold justify-between w-[35%] py-4">
								<button className="outline outline-2 outline-green-500 px-4 py-1 rounded-md">
									Buy Now
								</button>

								<button className="outline outline-2 outline-green-500 px-4 py-1 rounded-md">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="col-span-1 outline outline-2 outline-white rounded-lg m-2"></div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}

export default ProductScreen;
