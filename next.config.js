/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['i.imgur.com'],
	},
};

// module.exports = {
// 	async rewrites() {
// 		return [
// 			{
// 				source: '/api/:path*',
// 				destination: 'http://localhost:3000/:path*',
// 			},
// 		];
// 	},
// };

module.exports = nextConfig;
