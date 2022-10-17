import { createContext, useState } from 'react';

export const SearchContext = createContext({
	searchValue: '',
	setSearchValue: () => null,
});

export const SearchProvider = ({ children }) => {
	const [searchValue, setSearchValue] = useState('');
	const value = { searchValue, setSearchValue };
	return (
		<SearchContext.Provider value={value}>
			{children}
		</SearchContext.Provider>
	);
};
