'use client'

import {ReactNode} from 'react'
import {useCreateDialog} from '@/components/providers/dialog-provider'
import {useHotkeys} from '@mantine/hooks'
import {useRouter} from 'next/navigation'

const KeybindProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const {setIsCreateDialogOpen} = useCreateDialog()

	useHotkeys([
		['n', () => setIsCreateDialogOpen(true)],
	])

	return (
		<>
			{children}
		</>
	)
}

export default KeybindProvider
