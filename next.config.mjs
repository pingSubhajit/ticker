/** @type {import('next').NextConfig} */

import CreatPwa from 'next-pwa'

const withPWA = CreatPwa({
	dest: 'public',
	register: true, // Register the PWA service worker
	skipWaiting: true, // Skip waiting for service worker activation
})

const nextConfig = withPWA({
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	}
})

export default nextConfig
