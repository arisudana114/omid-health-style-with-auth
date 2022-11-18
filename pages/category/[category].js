import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import { ProductProvider } from '../../contexts/ProductContext';
import db from '../../utils/db';

import AllProducts from '../../components/AllProducts';
import ProductCard from '../../components/ProductCard';

const CategoryPage = ({ products }) => {
	const { query } = useRouter();
	const { category } = query;

	const productsInCategory = products.filter(
		(product) => product.categorySlug === category
	);

	console.log(query);
	console.log(products);
	console.log(productsInCategory);

	return (
		<Layout>
			<div className="text-center border-b container mx-auto mb-20">
				<p className="text-2xl mt-8">
					{category
						.split('-')
						.join(' ')
						.replace(/\w\S*/g, function (txt) {
							return (
								txt.charAt(0).toUpperCase() +
								txt.substr(1).toLowerCase()
							);
						})}
				</p>
				<hr width="50%" className="ml-auto mr-auto" />
				<div className="grid grid-cols-2 gap-4 mt-4 text-center px-6 text-sm md:grid-cols-5">
					{productsInCategory.map((product) => {
						return (
							<ProductCard product={product} key={product.id} />
						);
					})}
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

export default CategoryPage;
