import {ReactNode} from 'react'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import KeybindProvider from '@/components/providers/keybind-provider'
import HelpButton from '@/components/HelpButton'

const AppLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = await createClient()

	const {data: { user }} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/')
	}

	return (
		<>
			<KeybindProvider>
				{children}

				<HelpButton />
			</KeybindProvider>
		</>
	)
}

export default AppLayout
