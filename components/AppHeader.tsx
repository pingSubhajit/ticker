'use client'

import {ChevronLeft, CircleHelp, Info, LogOut} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useHotkeys} from '@mantine/hooks'
import {memo, useEffect, useState} from 'react'
import {useHelpDialog} from '@/components/providers/dialog-provider'

interface AppHeaderProps {
	title: string
	profileUrl: string
	backLink?: string
}

const AppHeaderUnMemoized = ({ title, profileUrl, backLink }: AppHeaderProps) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	// Use client-side only state for the profile URL to avoid hydration mismatch
	const [clientProfileUrl, setClientProfileUrl] = useState('')
	const [clientTitle, setClientTitle] = useState('')
	const {setIsHelpDialogOpen} = useHelpDialog()

	// Set the profile URL and title only on the client side
	useEffect(() => {
		setClientProfileUrl(profileUrl)
		setClientTitle(title)
	}, [profileUrl, title])

	useHotkeys([
		['i', () => setIsUserMenuOpen(!isUserMenuOpen)]
	])

	return (
		<header className="flex items-center justify-between gap-2 md:gap-4">
			{!backLink && <Link href="/about"><Image src={logo} alt="Ticker logo" className="w-10 h-10 rounded-full"/></Link>}
			{backLink && <Link href={backLink} aria-hidden>
				<button role="link" className="w-10 aspect-square bg-neutral-50/5 hover-hover:hover:bg-neutral-200/10 rounded-full flex items-center justify-center transition">
					<span className="sr-only">Back to home</span>
					<ChevronLeft className="w-4 h-4" aria-hidden/>
				</button>
			</Link>}

			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-[70%] md:w-[80%] rounded-full text-yellow-400">
				{clientTitle || ''}
			</h2>

			<DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
				<DropdownMenuTrigger>
					{clientProfileUrl ? (
						<Image
							src={clientProfileUrl}
							alt="Profile" width={128}
							height={128} className="w-10 h-10 rounded-full"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-neutral-800"></div>
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setIsHelpDialogOpen(true)}>
						<CircleHelp className="w-4 h-4 mr-2" />
						Help
					</DropdownMenuItem>
					<Link href="/about"><DropdownMenuItem>
						<Info className="w-4 h-4 mr-2" />
						About Ticker
					</DropdownMenuItem></Link>
					<Link href="/auth/logout" prefetch={false}><DropdownMenuItem>
						<LogOut className="w-4 h-4 mr-2" />
						Log out
					</DropdownMenuItem></Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

const AppHeader = memo(AppHeaderUnMemoized)

export default AppHeader
