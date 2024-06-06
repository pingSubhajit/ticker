'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'

const HelpDialog = ({ open, setOpen }: { open: boolean, setOpen: (isOpen: boolean) => void  }) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-2xl top-[50%] max-h-[95svh] overflow-y-scroll">
				<DialogHeader>
					<DialogTitle className="text-2xl">Help</DialogTitle>
				</DialogHeader>

				<div className="prose prose-invert font-sans w-full max-w-2xl">
					<h4>New timer</h4>
					<p>
						Start a new stopwatch by pressing the <pre className="inline">+</pre> button or pressing <kbd>N</kbd> on the
						keyboard. You'll be asked to enter a name for the timer. Although entering name is optional but
						highly recommended if you use the product frequently to help you identify your timers.
					</p>

					<h4>Usage</h4>
					<p>
						The timer starts counting the moment you create the timer and stops the moment you press stop.
						That means even in case of network delays, the timer will be accurate.
					</p>

					<h4>Shortcuts</h4>

					<h5>From everywhere: </h5>
					<ul>
						<li><kbd>N</kbd> to Create a new timer</li>
						<li><kbd>H</kbd> to go to the home page</li>
						<li><kbd>A</kbd> to go to the about page</li>
						<li><kbd>F1</kbd> or <kbd>?</kbd> for help</li>
					</ul>

					<h5>From individual timer screen: </h5>
					<ul>
						<li><kbd>Space</kbd> or <kbd>P</kbd> or <kbd>K</kbd> to pause and resume the timer</li>
						<li><kbd>S</kbd> to stop the timer</li>
						<li><kbd>R</kbd> to restart the timer</li>
						<li><kbd>⌘</kbd><kbd>Backspace</kbd> to delete the timer</li>
					</ul>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default HelpDialog
