import {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://tickernow.xyz',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: 'https://tickernow.xyz/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: 'https://tickernow.xyz/privacy',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		},
		{
			url: 'https://tickernow.xyz/terms',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		}
	]
}