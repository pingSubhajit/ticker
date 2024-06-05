'use client'

import {ChevronLeft} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.png'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'

interface AppHeaderProps {
	title: string
	profileUrl: string
	isTimer?: boolean
	backLink?: string
}

const AppHeader = ({ title, profileUrl, isTimer=false, backLink }: AppHeaderProps) => {
	return (
		<header className="flex items-center justify-between gap-2 md:gap-4">
			{!backLink && <Link href="/about"><Image src={logo} alt="Ticker logo" className="w-10 h-10 rounded-full"/></Link>}
			{backLink && <Link href={backLink}>
				<button className="w-10 aspect-square bg-neutral-50/5 hover-hover:hover:bg-neutral-200/10
				rounded-full flex items-center justify-center transition">
					<ChevronLeft className="w-4 h-4" />
				</button>
			</Link>}

			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-[70%] md:w-[80%]
			 rounded-full text-yellow-400">
				{title}
			</h2>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Image src={profileUrl} alt={profileUrl} width={128} height={128} className="w-10 h-10 rounded-full" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Link href="/about"><DropdownMenuItem>About Ticker</DropdownMenuItem></Link>
					<Link href="/auth/logout"><DropdownMenuItem>Log out</DropdownMenuItem></Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}

export default AppHeader
