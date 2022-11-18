import React from 'react';
import Link from 'next/link';

const CategoryList = () => {
	return (
		<div className="text-center mt-6">
			<p className="text-sm md:text-lg">Or browse through our products</p>
			<div className="flex justify-between mt-1 text-green-300 px-6 md:px-80">
				<Link href={'/category/nuts'}>
					<a className="md:text-xl">Nuts</a>
				</Link>
				<Link href={'/category/dried-fruits'}>
					<a className="md:text-xl">Dried Fruits</a>
				</Link>
				<Link href={'/category/seeds'}>
					<a className="md:text-xl">Seeds</a>
				</Link>
				<Link href={'/category/spices'}>
					<a className="md:text-xl">Spices</a>
				</Link>
				<Link href={'/category/dairies'}>
					<a className="md:text-xl">Dairies</a>
				</Link>
			</div>
		</div>
	);
};

export default CategoryList;
