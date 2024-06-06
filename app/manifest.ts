import {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Ticker - Long Duration Stopwatch',
		short_name: 'Ticker',
		description: 'Ticker is a mobile-first, long-duration, cloud-synced stopwatch application. Track time for days, ' +
			'months, or even years. Create and access your stopwatches from anywhere. Free and open-source with an MIT license.',
		start_url: '/',
		display: 'standalone',
		background_color: '#0a0a0a',
		theme_color: '#facc15',
		icons: [
			{
				src: '/logo.png',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
		orientation: 'portrait',
	}
}