import { decodeBase64 } from 'bcryptjs';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async (req, res) => {
	const session = await getSession({ req });
	if (!session || (session && session.isAdmin)) {
		return res.status(401).send('signin required');
	}

	await db.connect();

	const ordersCount = await Order.countDocuments();
	const productsCount = await Product.countDocuments();
	const usersCount = await User.countDocuments();
};

export default handler;
