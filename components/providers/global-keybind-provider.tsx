'use client'

import {ReactNode} from 'react'
import {useRouter} from 'next/navigation'
import {useHotkeys} from '@mantine/hooks'
import {useHelpDialog} from '@/components/providers/dialog-provider'

const GlobalKeybindProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const {setIsHelpDialogOpen} = useHelpDialog()

	useHotkeys([
		['?', () => setIsHelpDialogOpen(true)],
		['f1', () => setIsHelpDialogOpen(true)],
		['h', () => router.push('/app')],
		['a', () => router.push('/about')]
	])

	return (
		<>
			{children}
		</>
	)
}

export default GlobalKeybindProvider
