import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';

const LoginScreen = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { redirect } = router.query;

	const { cartState, cartDispatch } = useContext(Store);

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || '/');
		}
	}, [redirect, router, session]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	// console.log(cartState);

	const orders = [];

	{
		cartState.cart.cartItems.map((item) => {
			orders.push(
				item.name +
					' ' +
					item.quantity +
					'gr' +
					' ' +
					item.itemQuantity +
					'x'
			);
		});
	}

	console.log(orders.join('\r\n'));

	return (
		<Layout>
			<form
				className="mx-auto max-w-screen-md p-10"
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1>Login</h1>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						{...register('email', {
							required: 'Please enter email',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter valid email',
							},
						})}
						className="w-full"
						autoFocus
					></input>
					{errors.email && (
						<div className="text-red-500 text-sm">
							{errors.email.message}
						</div>
					)}
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						{...register('password', {
							required: 'Please enter password',
							minLength: {
								value: 6,
								message:
									'password should be more than 5 characters',
							},
						})}
						className="w-full"
						autoFocus
					></input>
					{errors.password && (
						<div className="text-red-500 text-sm">
							{errors.password.message}
						</div>
					)}
					<div>
						<button>Login</button>
					</div>
					<div>
						Don&apos;t have an account? &nbsp;
						<Link href="register">Register</Link>
					</div>
					<div className="mt-20 text-center">
						<p>Continue without login</p>
						<p className="mb-4">Order by whatsapp</p>
						<Link
							href={`https://wa.me/62895331759916?text=Hi I'm ordering these items from the website: ${JSON.stringify(
								orders
							)}`}
						>
							<a className="bg-green-500 px-4 rounded-md">
								Click here
							</a>
						</Link>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default LoginScreen;
