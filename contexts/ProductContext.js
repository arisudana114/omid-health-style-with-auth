import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext({
	productsArray: [],
});

export const ProductProvider = ({ children, products }) => {
	const [productsArray, setProductsArray] = useState({});

	// useEffect(() => {
	// 	const getCategoriesMap = async () => {
	// 		const categoryMap = await getCategoriesAndDocuments();
	// 		setProductsArray(categoryMap);
	// 	};

	// }, []);

	useEffect(() => {
		setProductsArray(products);
	}, [products]);

	const value = { productsArray };
	return (
		<ProductContext.Provider value={value}>
			{children}
		</ProductContext.Provider>
	);
};
