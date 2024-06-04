import {ReactNode} from 'react'
import {cva} from 'class-variance-authority'

const button = cva('rounded-2xl transition', {
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
				'border border-yellow-400',
				'hover:bg-yellow-400/10',
			]
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

interface ButtonProps {
	children: ReactNode
	variant?: 'primary' | 'secondary'
	size?: 'small' | 'base' | 'full' | 'icon'
	onClick?: () => void
	className?: string
}

const Button = ({className, variant, size, children, onClick, ...props }: ButtonProps) => {
	return (
		<button className={button({ variant, size, className })} {...props} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
