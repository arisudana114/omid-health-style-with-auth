import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import CartItem from './CartItem';
import dynamic from 'next/dynamic';

const CartPopup = ({ cart, handleCart }) => {
	const router = useRouter();

	const handleCheckout = () => {
		router.push('login?redirect=/shipping');
	};

	const { cartState, cartDispatch } = useContext(Store);

	const [cartTotal, setcartTotal] = useState(0);

	// console.log(cartState.cart.cartItems.length);
	useEffect(() => {
		const newCartTotal = cartState.cart.cartItems.reduce(
			(total, item) => total + item.price * item.itemQuantity,
			0
		);
		setcartTotal(newCartTotal);
	}, [cartState.cart.cartItems]);

	return (
		<div>
			<div
				className={
					!cart
						? 'px-4 pt-4 flex flex-col items-center fixed left-0 top-[4.5rem] text-sm w-[75%] h-[70vh] border-r border-b border-b-green-600 border-r-green-600 bg-[#1e1e1e] z-40 ease-in-out duration-500 overflow-scroll text-center'
						: 'fixed left-[-100%] h-[70vh] overflow-scroll top-0 ease-in-out duration-500'
				}
				onClick={
					cartState.cart.cartItems.length === 0
						? handleCart
						: () => {}
				}
			>
				{cartState.cart.cartItems.length === 0 ? (
					<div className="pt-20 text-center">
						<p>Your cart is empty</p>
						<button
							onClick={() => {
								router.push('/');
							}}
							className="bg-green-500 px-4 py-1 rounded-md mt-4"
						>
							Start shopping
						</button>
					</div>
				) : (
					''
				)}
				<div>
					{cartState.cart.cartItems.length >= 1 ? (
						<div className="text-center mb-4 border-b border-b-green-400">
							<p>Your total purchase is</p>
							<p>Rp. {cartTotal}</p>
						</div>
					) : (
						''
					)}

					{cartState.cart.cartItems.map((item) => {
						return (
							//   <div key={item.name + item.price + item.itemQuantity}>
							//     <p>{item.name}</p>
							//     <p>{item.price}</p>
							//     <p>{item.itemQuantity}</p>
							//     <p>{item.quantity}</p>
							//   </div>
							<CartItem
								key={item.name + item.price + item.itemQuantity}
								image={item.image[0]}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								itemQuantity={item.itemQuantity}
								cartDispatch={cartDispatch}
								cartState={cartState}
								item={item}
							/>
						);
					})}
				</div>
				<button
					className={
						!cart
							? 'primary-button ease-in-out duration-500 mt-auto mb-4'
							: 'hidden'
					}
					onClick={handleCheckout}
				>
					CHECKOUT
				</button>
			</div>
			<div
				className={
					!cart
						? 'px-4 pt-4 fixed right-0 top-[4.5rem] text-sm w-[25%] h-[70vh] z-40 ease-in-out duration-500 overflow-scroll'
						: 'fixed left-[-100%] h-[70vh] overflow-scroll top-0 ease-in-out duration-500'
				}
				onClick={handleCart}
			></div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(CartPopup), { ssr: false });
