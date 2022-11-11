import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const AdminProductEditScreen = () => {
	const { query } = useRouter();
	const productId = query.id;
	const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
		loading: true,
		error: '',
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(
					`/api/admin/products/${productId}`
				);
				dispatch({ type: 'FETCH_SUCCESS' });
				setValue('name', data.name);
				setValue('slug', data.slug);
				// setValue('price', data.price);
				// setValue('image', data.image);
				// setValue('brand', data.brand);
				// setValue('countInStock', data.countInStock);
				setValue('description', data.description);
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		fetchData();
	}, [productId, setValue]);

	const router = useRouter();

	const submitHandler = async ({
		name,
		slug,
		// price = [100, 200, 300],
		// image = ['image', 'image2', 'image3'],
		// brand,
		// countInStock,
		description,
	}) => {
		try {
			dispatch({ type: 'UPDATE_REQUEST' });
			await axios.put(`/api/admin/products/${productId}`, {
				name,
				slug,
				// price,
				// image,
				// brand,
				// countInStock,
				description,
			});
			dispatch({ type: 'UPDATE_SUCCESS' });
			toast.success('Product updated successfully');
			router.push('/admin/products');
		} catch (err) {
			dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
			toast.error(getError(err));
		}
	};

	return (
		<Layout title={`Edit Product ${productId}`}>
			<div className="grid md:grid-cols-4 md:gap-5">
				<ul>
					<li>
						<Link href="/admin/dashboard">Dashboard</Link>
					</li>
					<li>
						<Link href="/admin/orders">Orders</Link>
					</li>
					<li>
						<Link href="/admin/products">
							<a className="font-bold">Products</a>
						</Link>
					</li>
					<li>
						<Link href="/admin/users">
							<a>Users</a>
						</Link>
					</li>
				</ul>
			</div>
			<div className="md:col-span-3">
				{loading ? (
					<div>Loading...</div>
				) : error ? (
					<div className="alert-error">{error}</div>
				) : (
					<form
						className="mx-auto max-w-screen-md"
						onSubmit={handleSubmit(submitHandler)}
					>
						<h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
						<div className="mb-4">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="w-full"
								id="name"
								autoFocus
								{...register('name', {
									required: 'Please enter name',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.name.message}
								</div>
							)}
						</div>
						<div className="mb-4">
							<label htmlFor="slug">Slug</label>
							<input
								type="text"
								className="w-full"
								id="slug"
								autoFocus
								{...register('slug', {
									required: 'Please enter slug',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.slug.message}
								</div>
							)}
						</div>
						{/* <div className="mb-4">
							<label htmlFor="price">Price</label>
							<input
								type="text"
								className="w-full"
								id="price"
								autoFocus
								{...register('price', {
									required: 'Please enter price',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.price.message}
								</div>
							)}
						</div>
						<div className="mb-4">
							<label htmlFor="image">Image</label>
							<input
								type="text"
								className="w-full"
								id="image"
								autoFocus
								{...register('image', {
									required: 'Please enter image',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.image.message}
								</div>
							)}
						</div> */}
						{/* <div className="mb-4">
							<label htmlFor="brand">Brand</label>
							<input
								type="text"
								className="w-full"
								id="brand"
								autoFocus
								{...register('brand', {
									required: 'Please enter brand',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.brand.message}
								</div>
							)}
						</div> */}
						{/* <div className="mb-4">
							<label htmlFor="countInStock">Count In Stock</label>
							<input
								type="text"
								className="w-full"
								id="countInStock"
								autoFocus
								{...register('countInStock', {
									required: 'Please enter countInStock',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.countInStock.message}
								</div>
							)}
						</div> */}
						<div className="mb-4">
							<label htmlFor="description">Description</label>
							<input
								type="text"
								className="w-full"
								id="description"
								autoFocus
								{...register('description', {
									required: 'Please enter description',
								})}
							/>
							{errors.name && (
								<div className="text-red-500">
									{errors.description.message}
								</div>
							)}
						</div>
						<div className="mb-4">
							<button
								disabled={loadingUpdate}
								className="primary-button"
							>
								{loadingUpdate ? 'Loading' : 'Update'}
							</button>
						</div>
						<div className="mb-4">
							<Link href={`/admin/products`}>Back</Link>
						</div>
					</form>
				)}
			</div>
		</Layout>
	);
};

AdminProductEditScreen.auth = { adminOnly: true };

export default AdminProductEditScreen;
