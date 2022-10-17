import BrowsedProducts from '../components/BrowsedProducts';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Product from '../models/Product';
import CategoryList from '../components/CategoryList';
import TodaysOffer from '../components/TodaysOffer';
import { SearchProvider } from '../contexts/SearchContext';
import { ProductProvider } from '../contexts/ProductContext';
import db from '../utils/db';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = ({ products }) => {
	return (
		<Layout>
			<ProductProvider products={products}>
				<SearchProvider>
					<Hero />
					<BrowsedProducts />
				</SearchProvider>
				<CategoryList />
				<TodaysOffer />
				<FeaturedProducts />
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

export default Home;
