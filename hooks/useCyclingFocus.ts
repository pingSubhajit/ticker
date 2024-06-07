import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'

type FocusIndex = number | null

const useCyclingFocus = (
	/** The size of the list of items. */
	listSize: number,
	/** The index of the initially focused item. Defaults to `null`. */
	initialFocus: FocusIndex = null,
): [FocusIndex, Dispatch<SetStateAction<FocusIndex>>] => {
	const [currentFocus, setCurrentFocus] = useState<FocusIndex>(initialFocus)

	const handleKeyDown = useCallback<(evt: KeyboardEvent) => void>(
		(evt) => {
			// Cycle up or down. Also start over if we're outside the list bounds.
			switch (evt.key) {
			case 'ArrowDown':
				evt.preventDefault()

				setCurrentFocus(
					currentFocus === null ? 0 : currentFocus === listSize - 1 ? 0 : currentFocus + 1,
				)
				break
			case 'ArrowUp':
				evt.preventDefault()
				setCurrentFocus(
					currentFocus === null
						? listSize - 1
						: currentFocus === 0
							? listSize - 1
							: currentFocus - 1,
				)
				break
			}
		},
	[listSize, currentFocus, setCurrentFocus],
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown, false)

		return () => {
			document.removeEventListener('keydown', handleKeyDown, false)
		}
	}, [handleKeyDown])

	return [currentFocus, setCurrentFocus]
}

export default useCyclingFocus