import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				summary: action.payload,
				error: '',
			};
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
};

const AdminDashboardScreen = () => {
	const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
		loading: true,
		summary: { salesData: [] },
		error: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get('/api/admin/summary');
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};

		fetchData();
	}, []);

	return (
		<Layout>
			<div className="grid grid-cols-4 gap-5 p-4">
				<div>
					<ul>
						<li>
							<a className="font-bold">Dashboard</a>
						</li>
						<li>
							<a>Orders</a>
						</li>
						<li>
							<a>Products</a>
						</li>
						<li>
							<a>Users</a>
						</li>
					</ul>
				</div>
				<div className="col-span-3">
					<h1 className="mb-4">Admin Dashboard</h1>
					{loading ? (
						<div>Loading...</div>
					) : error ? (
						<div className="alert-error">{error}</div>
					) : (
						<div>
							<div className="grid grid-cols-1">
								<div className="card m-5 p-5">
									<p className="text-3xl">
										${summary.ordersPrice}
									</p>
									<p>Sales</p>
									<Link href="/admin/orders">View sales</Link>
								</div>
								<div className="card m-5 p-5">
									<p className="text-3xl">
										${summary.ordersCount}
									</p>
									<p>Orders</p>
									<Link href="/admin/orders">
										View orders
									</Link>
								</div>
								<div className="card m-5 p-5">
									<p className="text-3xl">
										${summary.productsCount}
									</p>
									<p>Products</p>
									<Link href="/admin/orders">
										View products
									</Link>
								</div>
								<div className="card m-5 p-5">
									<p className="text-3xl">
										${summary.usersCount}
									</p>
									<p>Users</p>
									<Link href="/admin/orders">View users</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

AdminDashboardScreen.auth = { adminOnly: true };

export default AdminDashboardScreen;
