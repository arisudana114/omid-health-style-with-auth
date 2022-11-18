import Image from 'next/image';
import React from 'react';

const CartItem = ({
	image,
	name,
	price,
	quantity,
	itemQuantity,
	cartDispatch,
	cartState,
	item,
}) => {
	const removeFromCartHandler = () => {
		cartDispatch({
			type: 'CART_REMOVE_ITEM',
			payload: {
				...item,
				price: item.price,
				quantity: item.quantity,
				itemQuantity,
			},
		});
	};

	const addToCartHandler = () => {
		const existItem = cartState.cart.cartItems.find(
			(x) => x.slug === item.slug && x.price === item.price
		);
		const itemQuantity = existItem ? existItem.itemQuantity + 1 : 1;
		cartDispatch({
			type: 'CART_ADD_ITEM',
			payload: {
				...item,
				price: item.price,
				quantity: item.quantity,
				itemQuantity,
			},
		});
	};

	const reduceFromCartHandler = () => {
		const existItem = cartState.cart.cartItems.find(
			(x) => x.slug === item.slug && x.price === item.price
		);
		const itemQuantity = existItem ? existItem.itemQuantity - 1 : 1;
		cartDispatch({
			type: 'CART_REDUCE_ITEM',
			payload: {
				...item,
				price: item.price,
				quantity: item.quantity,
				itemQuantity,
			},
		});
	};

	return (
		<div>
			<div className="flex w-full md:w-[90%] justify-between mb-2 border-b border-b-green-500">
				<div className="w-[40%]">
					<Image src={image} alt={name} width="100%" height="100%" />
				</div>
				<div className="flex flex-col items-start w-[60%]">
					<div className="flex justify-between w-full pr-1">
						<p>{name}</p>
						<button onClick={removeFromCartHandler}>x</button>
					</div>
					<p>{quantity} gr</p>
					<p>Rp. {price}</p>
					<div className="flex justify-between items-center w-full m-2 md:w-3/4">
						<button
							onClick={reduceFromCartHandler}
							className="font-bold text-gray-700 rounded-full bg-green-500 flex items-center justify-center font-mono w-[2rem] h-[2rem]"
						>
							&#8722;
						</button>
						<p>x {itemQuantity}</p>
						<button
							onClick={addToCartHandler}
							className="font-bold text-gray-700 rounded-full bg-green-500 flex items-center justify-center font-mono w-[2rem] h-[2rem]"
						>
							&#43;
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
