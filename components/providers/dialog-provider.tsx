'use client'

import {createContext, useContext, useMemo, useState} from 'react'
import CreateTimerDialog from '@/components/dialogs/CreateTimerDialog'
import HelpDialog from '@/components/dialogs/HelpDialog'

type DialogContextValueType = {
	isCreateDialogOpen: boolean
	isHelpDialogOpen: boolean
}

type UpdateStateFunctionType = (isOpen: boolean) => void

export type DialogContextType = [DialogContextValueType, {
	setIsCreateDialogOpen: UpdateStateFunctionType
	setIsHelpDialogOpen: UpdateStateFunctionType
}]

const defaultDialogContext: DialogContextValueType = {
	isCreateDialogOpen: false,
	isHelpDialogOpen: false
}

const DialogContext = createContext(
	[
		defaultDialogContext,
		{
			setIsCreateDialogOpen: () => {},
			setIsHelpDialogOpen: () => {}
		}
	] as DialogContextType
)

export const DialogsProvider = ({children}: {children: React.ReactNode}) => {
	const [dialogContext, setDialogContext] = useState<DialogContextValueType>(defaultDialogContext)

	const setIsCreateDialogOpenUnMemoized = (isOpen: boolean) => {
		setDialogContext({...dialogContext, isCreateDialogOpen: isOpen})
	}

	const setIsCreateDialogOpen = useMemo(() => setIsCreateDialogOpenUnMemoized, [dialogContext.isCreateDialogOpen])

	const setIsHelpDialogOpenUnMemoized = (isOpen: boolean) => {
		setDialogContext({...dialogContext, isHelpDialogOpen: isOpen})
	}

	const setIsHelpDialogOpen = useMemo(() => setIsHelpDialogOpenUnMemoized, [dialogContext.isHelpDialogOpen])

	return (
		<DialogContext.Provider value={
			[dialogContext, {
				setIsCreateDialogOpen,
				setIsHelpDialogOpen
			}]
		}>
			{children}

			<CreateTimerDialog open={dialogContext.isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			<HelpDialog open={dialogContext.isHelpDialogOpen} setOpen={setIsHelpDialogOpen} />
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

export const useHelpDialog = () => {
	const context = useContext(DialogContext)

	if (!context) {
		throw new Error('useDialogs must be used within a DialogsProvider')
	}

	return {isHelpDialogOpen: context[0].isHelpDialogOpen, setIsHelpDialogOpen: context[1].setIsHelpDialogOpen}
}
