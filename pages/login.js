import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

const LoginScreen = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {
		console.log(email, password);
	};

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
				</div>
			</form>
		</Layout>
	);
};

export default LoginScreen;
