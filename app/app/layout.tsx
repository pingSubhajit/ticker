import {ReactNode} from 'react'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'

const AppLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = createClient()

	const {data: { user }} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/')
	}

	return (
		<>
			{children}
		</>
	)
}

export default AppLayout
