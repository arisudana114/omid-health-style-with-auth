import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
	cart: Cookies.get('cart')
		? JSON.parse(Cookies.get('cart'))
		: { cartItems: [], shippingAddress: {} },
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) =>
					item.slug === newItem.slug && item.price === newItem.price
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item.name === existItem.name &&
						item.price === newItem.price
							? newItem
							: item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REDUCE_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) =>
					item.slug === newItem.slug && item.price === newItem.price
			);
			// if (existItem.itemQuantity === 1) {
			//   return { ...state, cart: { ...state.cart, cartItems } };
			// }
			const cartItems = existItem
				? existItem.itemQuantity === 1
					? state.cart.cartItems.filter(
							(item) => item.name !== existItem.name
					  )
					: state.cart.cartItems.map((item) =>
							item.name === existItem.name &&
							item.price === newItem.price
								? newItem
								: item
					  )
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) =>
					item.slug === newItem.slug && item.price === newItem.price
			);
			const cartItems = existItem
				? state.cart.cartItems.filter(
						(item) => item.name !== existItem.name
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'SAVE_SHIPPING_ADDRESS':
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: {
						...state.cart.shippingAddress,
						...action.payload,
					},
				},
			};
		case 'SAVE_PAYMENT_METHOD':
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload,
				},
			};
		default:
			return state;
	}
};

export function StoreProvider({ children }) {
	const [cartState, cartDispatch] = useReducer(reducer, initialState);
	const value = { cartState, cartDispatch };
	return <Store.Provider value={value}>{children}</Store.Provider>;
}
