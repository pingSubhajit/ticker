import type {Metadata} from 'next'
import './clash-display.css'
import './globals.css'
import {defaultUrl, portfolio} from '@/lib/constants'
import {Toaster} from '@/components/ui/sonner'
import {DialogsProvider} from '@/components/providers/dialog-provider'
import NextTopLoader from 'nextjs-toploader'
import GlobalKeybindProvider from '@/components/providers/global-keybind-provider'

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Ticker - Long Duration Stopwatch',
	description: 'Ticker is a mobile-first, long-duration, cloud-synced stopwatch application. Track time for days, ' +
		'months, or even years. Create and access your stopwatches from anywhere. Free and open-source with an MIT license.',
	keywords: [
		'stopwatch', 'timer', 'long duration', 'cloud synced', 'open source', 'mobile first', 'minimalistic',
		'Ticker', 'long duration stopwatch', 'cloud synced stopwatch', 'open source stopwatch', 'minimalistic stopwatch',
		'mobile stopwatch app', 'free stopwatch', 'stopwatch for days', 'stopwatch for months', 'stopwatch for years'
	],
	generator: 'Next.js',
	manifest: '/manifest.webmanifest',
	icons: [
		{ rel: 'apple-touch-icon', url: 'logo.png' },
		{ rel: 'icon', url: 'logo.png' },
	],
	authors: [{ name: 'Subhajit Kundu', url: portfolio }]
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="font-ClashDisplay">
				{/* PROGRESS BAR */}
				<NextTopLoader showSpinner={false} color="#facc15" />
			
				<DialogsProvider>
					<GlobalKeybindProvider>
						<div className="[&>main]:min-h-svh w-full mx-auto max-w-[600px] px-6 [&>main]:py-6">
							{children}
						</div>
					</GlobalKeybindProvider>
				</DialogsProvider>

				<Toaster richColors />
			</body>
		</html>
	)
}
