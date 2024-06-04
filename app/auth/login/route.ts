import {NextRequest, NextResponse} from 'next/server'
import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'

export const GET = async (req: NextRequest, res: NextResponse) => {
	const supabase = createClient()
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${new URL(req.url).origin}/auth/callback`,
		}
	})

	if (error) {
		return redirect('/?message=Could not authenticate user')
	}

	return redirect(data.url)
}