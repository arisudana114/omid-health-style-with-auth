export default async function handler(req, res) {
	// parsedRequest = JSON.parse(req.body);

	var myHeaders = new Headers();
	myHeaders.append('key', 'a1ea1bc419e47ff818a0402eaa05e2ca');
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

	var urlencoded = new URLSearchParams();
	urlencoded.append('origin', '131');
	urlencoded.append('destination', '114');
	urlencoded.append('weight', '1700');
	urlencoded.append('courier', 'jne');

	var requestOptions = {
		method: 'POST',
		body: urlencoded,
		redirect: 'follow',
		headers: myHeaders,
	};

	await fetch('https://api.rajaongkir.com/starter/cost', requestOptions)
		.then((response) => response.json())
		.then((json) => res.status(200).json(json));
}
