import User from '../../models/User';
import Product from '../../models/Product';
import data from '../../data';
import db from '../../utils/db';

const handler = async (req, res) => {
	console.log(data.users);
	await db.connect();
	await User.deleteMany();
	await User.insertMany(data.users);
	await Product.deleteMany();
	await Product.insertMany(data.products);
	await db.disconnect();
	res.send({ message: 'seeded succesfully' });
};

export default handler;
