import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import {defaultUrl} from '@/lib/constants'

export const GET = async () => {
	const supabase = await createClient()
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${defaultUrl}/auth/callback`,
		}
	})

	if (error) {
		return redirect('/?message=Could not authenticate user')
	}

	return redirect(data.url)
}