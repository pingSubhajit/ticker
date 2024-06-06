/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true, // Register the PWA service worker
	skipWaiting: true, // Skip waiting for service worker activation
})

const nextConfig = 

module.exports = withPWA({
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	}
})
