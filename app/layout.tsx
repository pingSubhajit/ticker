import type {Metadata} from 'next'
import './clash-display.css'
import './globals.css'
import {defaultUrl} from '@/lib/constants'
import {Toaster} from '@/components/ui/sonner'

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="font-ClashDisplay">
				<div className="min-h-svh w-full mx-auto max-w-[700px] p-6">
					{children}
				</div>

				<Toaster />
			</body>
		</html>
	)
}
