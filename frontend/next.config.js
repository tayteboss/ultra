const nextConfig = {
	reactStrictMode: true,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	typescript: {
		// Warning: This allows production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: true,
	},
	env: {
		SITE_URL: process.env.SITE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '**',
			},
		],
	},
	async redirects() {
		return [
		  {
			source: '/',
			destination: 'https://www.ultra.london',
			permanent: true,
			basePath: false
		  },
		]
	  },
};

module.exports = nextConfig;
