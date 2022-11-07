import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

const Shipping = ({ province, city }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const [destination, setDestination] = useState('');
	const [courier, setCourier] = useState('');

	const setDestinationHandler = (event) => setDestination(event.target.value);
	const setCourierHandler = (event) => setCourier(event.target.value);

	const [costData, setCostData] = useState({});

	// const fetchCost = async (event) => {
	// 	const cost = await axios.post('/api/cost', {
	// 		origin: '153',
	// 		destination: event.target.value,
	// 		weight: 1700,
	// 		courier: 'jne',
	// 	});
	// 	setCostData(cost.data);
	// 	console.log(costData);
	// };
	const { cartState, cartDispatch } = useContext(Store);

	useEffect(() => {
		const fetchCost = async () => {
			const cost = await axios.post('/api/cost', {
				origin: '153',
				destination: destination,
				weight: cartState.cart.cartWeight,
				courier: courier,
			});
			setCostData(cost.data);
			// console.log(costData);
		};

		fetchCost().catch(console.error);
	}, [cartState.cart.cartWeight, courier, destination]);

	const { cart } = cartState;
	const { shippingAddress } = cart;

	const router = useRouter();

	const [provinceId, setProvinceId] = useState(null);

	const [filteredCity, setFilteredCity] = useState(city.rajaongkir.results);

	useEffect(() => {
		setFilteredCity(
			city.rajaongkir.results.filter((x) => x.province_id === provinceId)
		);
	}, [city.rajaongkir.results, provinceId]);

	const provinceHandler = (event) => {
		setProvinceId(event.target.value);
	};

	useEffect(() => {
		setValue('fullName', shippingAddress.fullName);
		setValue('address', shippingAddress.address);
		setValue('city', shippingAddress.city);
		setValue('postalCode', shippingAddress.postalCode);
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode }) => {
		cartDispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: { fullName, address, city, postalCode },
		});
		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				shippingAddress: {
					fullName,
					address,
					city,
					postalCode,
				},
			})
		);

		router.push('/payment');
	};

	console.log(costData.rajaongkir);
	console.log(cartState);

	return (
		<Layout>
			<div className="container flex flex-col items-center p-8">
				<p>Please enter your shipping address</p>
				<p>And contact information</p>

				<form
					className="w-full p-4"
					onSubmit={handleSubmit(submitHandler)}
				>
					<div>
						<label htmlFor="fullName">Full Name</label>
						<input
							className="w-full"
							id="fullName"
							type="text"
							autoFocus
							{...register('fullName', {
								required: 'Please enter full name',
							})}
						/>
						{errors.fullName && (
							<div className="text-red-500">
								{errors.fullName.message}
							</div>
						)}
					</div>
					<label htmlFor="province">Select Province</label>
					<select
						name="province"
						id="province"
						className="text-black rounded-md mb-2 w-full"
						onChange={provinceHandler}
					>
						<option selected>Please select a province</option>
						{province.rajaongkir.results.map((province) => {
							return (
								<option
									value={province.province_id}
									key={province.province.id}
								>
									{province.province}
								</option>
							);
						})}
					</select>
					<label htmlFor="city">Select City</label>
					<select
						name="city"
						id="city"
						className="text-black rounded-md mb-2 w-full"
						{...register('city', {
							required: 'Please enter city name',
							minLength: {
								value: 3,
								message:
									'Address should be more than 2 characters',
							},
						})}
						onChange={setDestinationHandler}
					>
						<option selected>Please select a province first</option>
						{filteredCity.map((city) => {
							return (
								<option value={city.city_id} key={city.city_id}>
									{city.city_name}
								</option>
							);
						})}
					</select>
					<div>
						<label htmlFor="address">Address</label>
						<textarea
							className="w-full rounded-lg h-20 p-2 text-black"
							id="address"
							type="text"
							{...register('address', {
								required: 'Please enter address',
								minLength: {
									value: 3,
									message:
										'Address should be more than 2 characters',
								},
							})}
						/>
						{errors.address && (
							<div className="text-red-500">
								{errors.address.message}
							</div>
						)}
					</div>
					{/* <div>
						<label htmlFor="city">City</label>
						<input
							className="w-full"
							id="city"
							type="text"
							{...register('city', {
								required: 'Please enter city name',
								minLength: {
									value: 3,
									message:
										'Address should be more than 2 characters',
								},
							})}
						/>
						{errors.city && (
							<div className="text-red-500">
								{errors.city.message}
							</div>
						)}
					</div> */}
					<div>
						<label htmlFor="postalCode">Postal Code</label>
						<input
							className="w-full"
							id="postalCode"
							type="text"
							{...register('postalCode', {
								required: 'Please input postal code',
							})}
						/>
						{errors.postalCode && (
							<div className="text-red-500">
								{errors.postalCode.message}
							</div>
						)}
					</div>
					<div>
						<label htmlFor="city">Select Delivery Service</label>
						<select
							className="text-black rounded-md mb-2 w-1/2"
							onChange={setCourierHandler}
						>
							<option selected>Choose one</option>
							<option value="jne">JNE</option>
							<option value="pos">POS Indonesia</option>
							<option value="tiki">TIKI</option>
						</select>
					</div>

					{/* <p>
						{costData.rajaongkir
							? costData.rajaongkir.results[0].costs[0].cost[0]
									.value
							: ''}
					</p> */}
					{costData.rajaongkir && courier
						? costData.rajaongkir.results[0].costs.map((cost) => {
								return (
									<div
										key={cost.service}
										className="border-b border-b-white mb-2"
									>
										<div className="flex justify-between pr-28">
											<p>{cost.service}</p>
											<p>-</p>
											<p>Rp. {cost.cost[0].value}</p>
										</div>
										<p>
											Estimated arrival {cost.cost[0].etd}{' '}
											days
										</p>
									</div>
								);
						  })
						: null}

					<div className="text-center mt-4">
						<button className="primary-button w-full">Next</button>
					</div>
				</form>
			</div>
			{/* <button onClick={fetchCost}>Make BODY call</button> */}
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const province = await axios.get(
		'https://api.rajaongkir.com/starter/province',
		{
			headers: { key: 'a1ea1bc419e47ff818a0402eaa05e2ca' },
		}
	);

	const city = await axios.get('https://api.rajaongkir.com/starter/city', {
		headers: { key: 'a1ea1bc419e47ff818a0402eaa05e2ca' },
	});

	// const cost = await fetch('http://localhost:3000/api/cost', {
	// 	method: 'POST',
	// 	form: JSON.stringify({
	// 		origin: '501',
	// 		destination: '114',
	// 		weight: 1700,
	// 		courier: 'jne',
	// 	}),
	// 	headers: {
	// 		key: 'a1ea1bc419e47ff818a0402eaa05e2ca',
	// 		'content-type': 'application/x-www-form-urlencoded',
	// 	},
	// });

	// const costData = await cost.json();

	// const cost = await axios.post('http://localhost:3000/api/cost', {
	// 	origin: '501',
	// 	destination: '115',
	// 	weight: 1700,
	// 	courier: 'jne',
	// });

	return {
		props: {
			province: province.data,
			city: city.data,
			// cost: cost.data,
		},
	};
};

export default Shipping;

Shipping.auth = true;
