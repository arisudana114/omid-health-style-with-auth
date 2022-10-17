import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
	cart: { cartItems: [] },
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
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		default:
			return state;
	}
};

export function StoreProvider({ children }) {
	const [cartState, cartDispatch] = useReducer(reducer, initialState);
	const value = { cartState, cartDispatch };
	return <Store.Provider value={value}>{children}</Store.Provider>;
}
