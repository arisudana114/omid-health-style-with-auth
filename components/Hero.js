import React from 'react';
import MagnifierIcon from '../components/MagnifierIcon';
import { SearchContext } from '../contexts/SearchContext';
import { useContext } from 'react';

const Hero = () => {
	const { setSearchValue } = useContext(SearchContext);

	const onChangeHandler = (event) => {
		const searchInput = event.target.value;
		setSearchValue(searchInput);
	};

	return (
		<>
			<div className="flex flex-col items-center">
				<p className="text-sm">Welcome to</p>
				<h1 className="text-2xl mb-2">Omid Health Style</h1>
				<div className="flex relative w-3/4 md:w-1/2">
					<div className="absolute left-2 top-1 pt-[0.1rem]">
						<MagnifierIcon />
					</div>
					<input
						type="text"
						onChange={onChangeHandler}
						placeholder="Find your favorite healthy food"
						className="w-full h-[2rem] rounded-full text-center text-sm text-black"
					/>
				</div>
			</div>
		</>
	);
};

export default Hero;
