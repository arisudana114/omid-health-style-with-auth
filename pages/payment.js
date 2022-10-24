import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

const PaymentScreen = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

	const { cartState, cartDispatch } = useContext(Store);
	const { cart } = cartState;
	const { shippingAddress, paymentMethod } = cart;

	const router = useRouter();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!selectedPaymentMethod) {
			return toast.error('Payment method is required');
		}
		cartDispatch({
			type: 'SAVE_PAYMENT_METHOD',
			payload: selectedPaymentMethod,
		});
		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				paymentMethod: selectedPaymentMethod,
			})
		);

		router.push('/placeorder');
	};

	useEffect(() => {
		if (!shippingAddress.address) {
			return router.push('shipping');
		}
		setSelectedPaymentMethod(paymentMethod || '');
	}, [paymentMethod, router, shippingAddress.address]);

	return (
		<Layout title="Payment Method">
			<div className="p-8">
				<form
					className="mx-auto max-w-screen-md p-4 border border-gray-50 rounded-lg"
					onSubmit={submitHandler}
				>
					<h1 className="text-center mb-4">Payment Method</h1>
					{['Bank Transfer', 'Cash On Delivery', 'GoPay'].map(
						(payment) => (
							<div key={payment} className="mb-4">
								<input
									name="paymentMethod"
									className="p-2 outline-none focus:ring-0"
									id={payment}
									type="radio"
									checked={selectedPaymentMethod === payment}
									onChange={() =>
										setSelectedPaymentMethod(payment)
									}
								></input>
								<label className="p-2" htmlFor={payment}>
									{payment}
								</label>
							</div>
						)
					)}
					<div className="flex justify-between">
						<button
							onClick={() => router.push('/shipping')}
							type="button"
							className="primary-button w-1/2 mx-2"
						>
							Back
						</button>
						<button className="primary-button w-1/2 mx-2">
							Next
						</button>
					</div>
				</form>
				<div className="flex flex-col items-center mt-4">
					<p>Bank Account</p>
					<p>BCA</p>
					<p>PT. Omid Health Style</p>
				</div>
			</div>
		</Layout>
	);
};

export default PaymentScreen;

PaymentScreen.auth = true;
