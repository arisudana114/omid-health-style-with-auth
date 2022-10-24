import axios from 'axios';

const handler = async (req, res) => {
	const city = await axios.get('https://api.rajaongkir.com/starter/city', {
		headers: { key: 'a1ea1bc419e47ff818a0402eaa05e2ca' },
	});
	res.json(city.data);
};
export default handler;
