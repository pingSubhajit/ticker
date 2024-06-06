import {ReactNode} from 'react'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import KeybindProvider from '@/components/providers/keybind-provider'

const AppLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = createClient()

	const {data: { user }} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/')
	}

	return (
		<>
			<KeybindProvider>
				{children}
			</KeybindProvider>
		</>
	)
}

export default AppLayout
