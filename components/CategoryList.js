import React from 'react';
import Link from 'next/link';

const CategoryList = () => {
	return (
		<div className="text-center mt-6">
			<p className="text-sm">Or browse through our products</p>
			<div className="flex justify-between mt-1 text-green-300 px-6">
				<Link href={'/nuts'}>Nuts</Link>
				<Link href={'/dried-fruits'}>Dried Fruits</Link>
				<Link href={'/seeds'}>Seeds</Link>
				<Link href={'/spices'}>Spices</Link>
				<Link href={'/dairies'}>Dairies</Link>
			</div>
		</div>
	);
};

export default CategoryList;
