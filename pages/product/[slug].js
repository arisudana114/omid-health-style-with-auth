import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import Product from '../../models/Product';

import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

const ProductScreen = ({ products }) => {
	const { query } = useRouter();
	const { slug } = query;

	const product = products.find((product) => product.slug === slug);
	console.log(product);
	return <Layout></Layout>;
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
