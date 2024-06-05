'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {z} from 'zod'
import {asOptionalField} from '@/lib/utils'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import Button from '@/components/Button'
import {createTimer} from '@/lib/mutations'
import {toast} from 'sonner'

const formSchema = z.object({
	name: asOptionalField(z.string().max(25)),
})

const CreateTimerDialog = ({ open, setOpen }: { open: boolean, setOpen: (isOpen: boolean) => void  }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const timer = await createTimer(values.name)
			form.reset()
			toast.success(`Timer "${timer.name}" created`)
			setOpen(false)
		} catch (error: any) {
			toast.error(error.message || 'Could not create timer')
		}
	}
	
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl">New timer</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="sr-only">Name of the timer (optional)</FormLabel>
									<FormControl>
										<Input placeholder="Name of the timer (optional)" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">Start timer</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTimerDialog
