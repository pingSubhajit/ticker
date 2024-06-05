'use client'

import {ChevronLeft} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const AppHeader = ({ title, profileUrl }: { title: string, profileUrl: string }) => {
	return (
		<header className="flex items-center justify-between gap-2 md:gap-4">
			<button className="w-10 aspect-square bg-neutral-50/5 rounded-full flex items-center justify-center">
				<ChevronLeft className="w-4 h-4" />
			</button>

			<h2 className="h-10 flex items-center justify-center border border-neutral-50/25 w-[70%] md:w-[80%]
			 rounded-full text-yellow-400">
				{title}
			</h2>

			<Link href="/auth/logout">
				<Image src={profileUrl} alt={profileUrl} width={128} height={128} className="w-10 h-10 rounded-full" />
			</Link>
		</header>
	)
}

export default AppHeader
