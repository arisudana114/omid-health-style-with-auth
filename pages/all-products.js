import Layout from '../components/Layout';
import Product from '../models/Product';
import { ProductProvider } from '../contexts/ProductContext';
import db from '../utils/db';

import AllProducts from '../components/AllProducts';

const AllProductsPage = ({ products }) => {
	return (
		<Layout>
			<ProductProvider products={products}>
				<AllProducts />
			</ProductProvider>
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

export default AllProductsPage;
