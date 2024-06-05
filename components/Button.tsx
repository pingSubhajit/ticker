import * as React from 'react'
import {ReactNode} from 'react'
import {cva} from 'class-variance-authority'

const button = cva('rounded-2xl transition flex justify-center items-center gap-2', {
	variants: {
		variant: {
			primary: [
				'bg-yellow-400',
				'text-neutral-950',
				'border border-transparent',
				'font-medium',
				'hover:bg-yellow-500',
			],
			secondary: [
				'bg-transparent',
				'text-yellow-400',
				'border-2 border-yellow-400',
				'hover:bg-yellow-400/10',
			],
			ghost: [
				'bg-transparent',
				'text-yellow-400',
				'border border-transparent',
				'hover:bg-yellow-400/10',
			],
			link: [
				'bg-transparent',
				'text-neutral-300',
				'hover:text-neutral-50',
				'border border-transparent',
				'hover:underline',
				'p-0',
				'underline-offset-4'
			],
		},
		size: {
			small: ['text-sm', 'py-1', 'px-2'],
			base: ['text-base', 'py-2', 'px-4'],
			full: ['w-full', 'py-3', 'px-4'],
			icon: ['p-12']
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'base',
	},
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'link'
	size?: 'small' | 'base' | 'full' | 'icon'
	className?: string,
	children: ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, size, children, ...props }, ref) => {
	return (
		<button className={button({ variant, size, className })} {...props}>
			{children}
		</button>
	)
})

Button.displayName = 'Button'

export default Button
