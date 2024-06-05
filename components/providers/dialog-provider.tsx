'use client'

import {createContext, useContext, useState} from 'react'
import CreateTimerDialog from '@/components/dialogs/CreateTimerDialog'

type DialogContextValueType = {
	isCreateDialogOpen: boolean
}

type UpdateStateFunctionType = (isOpen: boolean) => void

export type DialogContextType = [DialogContextValueType, {
	setIsCreateDialogOpen: UpdateStateFunctionType
}]

const defaultDialogContext: DialogContextValueType = {
	isCreateDialogOpen: false
}

const DialogContext = createContext(
	[
		defaultDialogContext,
		{
			setIsCreateDialogOpen: () => {}
		}
	] as DialogContextType
)

export const DialogsProvider = ({children}: {children: React.ReactNode}) => {
	const [dialogContext, setDialogContext] = useState<DialogContextValueType>(defaultDialogContext)

	const setIsCreateDialogOpen = (isOpen: boolean) => {
		setDialogContext({...dialogContext, isCreateDialogOpen: isOpen})
	}

	return (
		<DialogContext.Provider value={
			[dialogContext, {
				setIsCreateDialogOpen
			}]
		}>
			{children}

			<CreateTimerDialog open={dialogContext.isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
		</DialogContext.Provider>
	)
}

export const useCreateDialog = () => {
	const context = useContext(DialogContext)

	if (!context) {
		throw new Error('useDialogs must be used within a DialogsProvider')
	}

	return {isCreateDialogOpen: context[0].isCreateDialogOpen, setIsCreateDialogOpen: context[1].setIsCreateDialogOpen}
}
