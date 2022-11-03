export default async function handler(req, res) {
	var axios = require('axios');
	var qs = require('qs');
	var data = qs.stringify({
		origin: '501',
		destination: req.body.destination,
		weight: '1700',
		courier: req.body.courier,
	});
	var config = {
		method: 'post',
		url: 'https://api.rajaongkir.com/starter/cost',
		headers: {
			key: 'a1ea1bc419e47ff818a0402eaa05e2ca',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: data,
	};

	// axios(config)
	// 	.then(function (response) {
	// 		console.log(JSON.stringify(response.data));
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});

	axios(config)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});

	// res.status(200).json(req.body.destination);
}
