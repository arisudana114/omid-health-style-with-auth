import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import CartItem from './CartItem';
import dynamic from 'next/dynamic';

const CartPopup = ({ cart, handleCart }) => {
	const router = useRouter();

	const { cartState, cartDispatch } = useContext(Store);

	const handleCheckout = () => {
		router.push('login?redirect=/shipping');
	};

	// const addToCartHandler = () => {
	// 	const existItem = cartState.cart.cartItems.find(
	// 		(x) => x.slug === item.slug && x.price === item.price
	// 	);
	// 	const itemQuantity = existItem ? existItem.itemQuantity + 1 : 1;
	// 	cartDispatch({
	// 		type: 'CART_ADD_ITEM',
	// 		payload: {
	// 			...item,
	// 			price: item.price,
	// 			quantity: item.quantity,
	// 			itemQuantity,
	// 		},
	// 	});
	// };

	const [cartTotal, setcartTotal] = useState(0);

	const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

	// console.log(cartState.cart.cartItems.length);
	useEffect(() => {
		const newCartTotal = cartState.cart.cartItems.reduce(
			(total, item) => total + item.price * item.itemQuantity,
			0
		);
		const newCartTotalQuantity = cartState.cart.cartItems.reduce(
			(total, item) => total + item.quantity * item.itemQuantity,
			0
		);
		setcartTotal(newCartTotal);
		setCartTotalQuantity(newCartTotalQuantity);
		cartDispatch({
			type: 'SAVE_SHIPPING_WEIGHT',
			payload: cartTotalQuantity,
		});
	}, [cartDispatch, cartState.cart.cartItems, cartTotalQuantity]);

	// console.log(cartTotalQuantity);
	// console.log(cartState.cart.cartWeight);

	return (
		<div>
			<div
				className={
					!cart
						? 'sm:cart-popup-sm md:bg-[#1e1e1e] fixed top-[4rem] left-[5.5rem] w-[25vw] h-[80vh] border-r border-b border-b-green-600 border-r-green-600  ease-in-out duration-500 overflow-scroll scrollbar-hide text-center lg:left-[10.5rem]'
						: 'sm:cart-popup-sm-hidden md:bg-[#1e1e1e] fixed -top-[100%] w-[0vw] h-[0vh] border-r border-b border-b-green-600 border-r-green-600 text-center opacity-0 ease-in-out duration-500 overflow-scroll scrollbar-hide '
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
							<p className="text-xs mt-4">
								Shop for more than Rp. 1,000,000
							</p>
							<p className="text-xs mb-4">to get 5% discount</p>
							<p>Your total purchase is</p>
							{cartTotal < 1000000 ? (
								<p>Rp. {cartTotal}</p>
							) : (
								<>
									<p className="text-xs">
										<s>Rp. {cartTotal}</s>
									</p>
									<p>
										Rp. {cartTotal - (cartTotal * 5) / 100}{' '}
									</p>
								</>
							)}

							{cartState.cart.cartItems.length >= 1 ? (
								<button
									className={
										!cart
											? 'primary-button ease-in-out duration-500 mt-auto mb-4 md:my-4'
											: 'hidden'
									}
									onClick={handleCheckout}
								>
									CHECKOUT
								</button>
							) : (
								''
							)}
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
			</div>
			<div
				className={
					!cart
						? 'sm:cart-popup-outer-sm md:hidden'
						: 'sm:cart-popup-outer-sm-hidden'
				}
				onClick={handleCart}
			></div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(CartPopup), { ssr: false });
