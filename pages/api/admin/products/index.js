import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
	const session = await getSession({ req });
	if (!session || !session.user.isAdmin) {
		return res.status(401).send('admin signin required');
	}
	// const { user } = session;
	if (req.method === 'GET') {
		return getHandler(req, res);
	} else if (req.method === 'POST') {
		return postHandler(req, res);
	} else {
		return res.status(400).send({ message: 'Method not allowed' });
	}
};

const postHandler = async (req, res) => {
	await db.connect();
	const newProduct = new Product({
		name: 'sample name',
		slug: 'sample-name-' + Math.random(),
		quantity: [250, 500, 1000],
		price: [1000, 1000, 1000],
		stock: [10, 10, 10],
		brand: ['omidhealthstyle'],
		image: ['/images/shirt1.jpg'],
		description: 'a new product, please edit me',
		isAvailable: true,
		isDiscount: false,
		discount: 0,
		isFeatured: false,
	});

	const product = await newProduct.save();
	await db.disconnect();
	res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
	await db.connect();
	const products = await Product.find({});
	await db.disconnect();
	res.send(products);
};

export default handler;
