import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';

const Shipping = ({ province, city }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	const { cartState, cartDispatch } = useContext(Store);
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

	// console.log(cost);
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
					<label htmlFor="province">Select City</label>
					<select
						name="city"
						id="city"
						className="text-black rounded-md mb-2 w-full"
					>
						<option selected>Please select a province first</option>
						{filteredCity.map((city) => {
							return (
								<option
									value={city.city_name}
									key={city.city_id}
								>
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
					<div className="text-center mt-4">
						<button className="primary-button w-full">Next</button>
					</div>
				</form>
			</div>
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

	// const cost = await axios.post('https://api.rajaongkir.com/starter/cost', {
	// 	headers: {
	// 		key: 'a1ea1bc419e47ff818a0402eaa05e2ca',
	// 		// 'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	form: {
	// 		origin: '1',
	// 		destination: '1',
	// 		weight: 1700,
	// 		courier: 'jne',
	// 	},
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
