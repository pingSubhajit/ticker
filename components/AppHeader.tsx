'use client'

import {ChevronLeft, CircleHelp, Info, LogOut} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useHotkeys} from '@mantine/hooks'
import {useState} from 'react'
import {useHelpDialog} from '@/components/providers/dialog-provider'

interface AppHeaderProps {
	title: string
	profileUrl: string
	isTimer?: boolean
	backLink?: string
}

const AppHeader = ({ title, profileUrl, isTimer=false, backLink }: AppHeaderProps) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const {setIsHelpDialogOpen} = useHelpDialog()

	useHotkeys([
		['i', () => setIsUserMenuOpen(!isUserMenuOpen)]
	])

	return (
		<header className="flex items-center justify-between gap-2 md:gap-4">
			{!backLink && <Link href="/about"><Image src={logo} alt="Ticker logo" className="w-10 h-10 rounded-full"/></Link>}
			{backLink && <Link href={backLink} aria-hidden>
				<button className="w-10 aspect-square bg-neutral-50/5 hover-hover:hover:bg-neutral-200/10 rounded-full flex items-center justify-center transition">
					<span className="sr-only">Back to home</span>
					<ChevronLeft className="w-4 h-4" aria-hidden/>
				</button>
			</Link>}

			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-[70%] md:w-[80%]
			 rounded-full text-yellow-400">
				{title}
			</h2>

			<DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
				<DropdownMenuTrigger>
					<Image
						src={profileUrl}
						alt={profileUrl} width={128}
						height={128} className="w-10 h-10 rounded-full"
					/>
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
					<Link href="/auth/logout"><DropdownMenuItem>
						<LogOut className="w-4 h-4 mr-2" />
						Log out
					</DropdownMenuItem></Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

export default AppHeader
