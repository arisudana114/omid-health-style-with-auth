import axios from 'axios';

const handler = async (req, res) => {
	const cost = await axios.post('https://api.rajaongkir.com/starter/cost', {
		headers: {
			key: 'a1ea1bc419e47ff818a0402eaa05e2ca',
			'content-type': 'application/x-www-form-urlencoded',
		},
		form: {
			origin: '501',
			destination: '114',
			weight: 1700,
			courier: 'jne',
		},
	});
	res.json(cost.data);
};
export default handler;

// axios
// 	.post('/user', {
// 		firstName: 'Fred',
// 		lastName: 'Flintstone',
// 	})
// 	.then(function (response) {
// 		console.log(response);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});
