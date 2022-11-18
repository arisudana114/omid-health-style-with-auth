import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
	AiOutlineClose,
	AiOutlineMenu,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import CartPopup from './CartPopup';

const Navbar = ({ status, session }) => {
	const [nav, setNav] = useState(true);
	const [cart, setCart] = useState(true);

	const logoutHandler = () => {
		signOut({ callbackUrl: '/login' });
	};

	const handleNav = () => {
		if (!cart) {
			setCart(!cart);
			setNav(!nav);
		} else {
			setNav(!nav);
		}
	};

	const handleCart = () => {
		if (!nav) {
			setNav(!nav);
			setCart(!cart);
		} else {
			setCart(!cart);
		}
	};

	// console.log(session);

	return (
		<>
			<div className="flex justify-end items-center p-4 relative h-[4.5rem] md:h-[6.5rem]">
				<div onClick={handleCart} className="z-50 mr-auto">
					<AiOutlineShoppingCart
						className="hover:cursor-pointer"
						size={27}
					/>
				</div>
				<div className="absolute ml-auto mr-auto left-0 right-0 top-4 text-center w-14 md:z-20 md:w-[5.3rem] hover:cursor-pointer">
					<Link href={'/'}>
						<Image
							src="/assets/omid.png"
							alt="omid-logo"
							width="100%"
							height="100%"
						/>
					</Link>
				</div>
				<hr
					width="60%"
					className="hidden absolute ml-auto mr-auto left-0 top-9 right-0 z-10"
				/>
				<ul className="hidden md:flex mr-10">
					<li className="p-2">Products</li>
					<li className="p-2">About Us</li>
					<li className="p-2">Contacts</li>
					{session?.user.isAdmin && (
						<li className="p-2">Admin Dashboard</li>
					)}
				</ul>
				<div onClick={handleNav} className="z-50">
					{!nav ? (
						<AiOutlineClose size={27} />
					) : (
						<AiOutlineMenu size={27} />
					)}
				</div>
			</div>
			<div>
				<ul
					onClick={handleNav}
					className={
						!nav
							? 'px-4 pt-10 fixed right-0 top-[4.5rem] text-sm w-[60%] h-[70vh] border-b border-b-green-600 border-l border-l-green-600 bg-[#1e1e1e] z-40 ease-in-out duration-500'
							: 'fixed right-[-100%] top-0 ease-in-out duration-500'
					}
				>
					<li className="p-2">Products</li>
					<li className="p-2">About Us</li>
					<li className="p-2">Contacts</li>
					{session?.user.isAdmin && (
						<li className="p-2">Admin Dashboard</li>
					)}
					<hr
						width="90%"
						className="text-white ml-auto mr-auto left-0 top-9 right-0 my-4"
					/>
					{status === 'loading' ? (
						'Loading'
					) : session?.user ? (
						<>
							<li className="p-2">{session.user.name}</li>
							<li className="p-2">Orders</li>
							<li className="p-2">
								<a onClick={logoutHandler}>Log Out</a>
							</li>
						</>
					) : (
						<Link href={'login'}>
							<li className="p-2">Login</li>
						</Link>
					)}
				</ul>
			</div>
			{/* <div className="cart">
				<ul
					onClick={handleCart}
					className={
						!cart
							? 'px-4 pt-10 fixed right-0 top-0 text-sm w-[60%] h-full border-r border-r-gray-600 bg-[#1e1e1e] z-40 ease-in-out duration-500'
							: 'fixed right-[-100%] top-0 ease-in-out duration-500'
					}
				>
					<li className="p-2">Cart</li>
					<li className="p-2">Cart</li>
					<li className="p-2">Cart</li>
				</ul>
			</div> */}
			<CartPopup cart={cart} handleCart={handleCart} />
		</>
	);
};

export default Navbar;
