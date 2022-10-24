import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

const PlaceOrderScreen = () => {
	const { cartState, cartDispatch } = useContext(Store);
	const { cart } = cartState;
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const router = useRouter();

	const shippingPrice = 20000;
	const itemsPrice = 300000;

	console.log(cartItems);

	const placeOrderHandler = async () => {
		try {
			const { data } = await axios.post('api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				shippingPrice,
				itemsPrice,
			});
			cartDispatch({ type: 'CART_CLEAR_ITEMS' });
			Cookies.set(
				'cart',
				JSON.stringify({
					...cart,
					cartItems: [],
				})
			);
			router.push(`/order/${data._id}`);
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<div>
			<Layout title="Place Order">
				<h1 className="mb-4 text-xl text-center">Place Order</h1>
				{cartItems.length === 0 ? (
					<div>
						Cart is empty. <Link href="/">Go shopping</Link>
					</div>
				) : (
					<div className="flex flex-col text-sm h-[80vh]">
						<div className="overflow-x-auto col-span-4 border-b border-green-500">
							<div className="p-5">
								<h2 className="text-xl text-center mb-2">
									Shipping Address
								</h2>
								<div>
									<p>{shippingAddress.fullName}</p>
									<p>{shippingAddress.address}</p>
									<p>{shippingAddress.city}</p>
									<p>{shippingAddress.postalCode}</p>
								</div>
								<div className="primary-button text-center w-1/4 mt-2">
									<Link href="/shipping">Edit</Link>
								</div>
							</div>
						</div>

						<div className="overflow-x-auto col-span-4 border-b border-green-500 text-sm max-h-[30vh] overflow-scroll">
							<div className="p-5">
								<h2 className="text-xl text-center mb-2">
									Order Summary
								</h2>
								{cartItems.map((item) => {
									return (
										<div
											key={item.slug}
											className="flex justify-between w-full"
										>
											<div className="flex justify-between w-1/2">
												<p>{item.name}</p>
												<p>{item.quantity} gr</p>
											</div>
											<div className="text-right w-[15%]">
												<p>x {item.itemQuantity}</p>
											</div>
											<div className="text-right w-[35%]">
												<p>Rp. {item.price}</p>
											</div>
										</div>
									);
								})}
								<div className="primary-button text-center w-1/4 mt-2">
									<Link href="/">Edit</Link>
								</div>
							</div>
						</div>
						<button
							onClick={placeOrderHandler}
							className="mt-auto primary-button w-[90%] mx-auto"
						>
							Place Order
						</button>
					</div>
				)}
			</Layout>
		</div>
	);
};

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
