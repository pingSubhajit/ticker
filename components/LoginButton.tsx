import {createClient} from '@/utils/supabase/server'
import Link from 'next/link'
import Button from '@/components/Button'

const LoginButton = async () => {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<>
			{!user && <Link href="/auth/login">
				<Button variant="link">Login</Button>
			</Link>}
			{user && <Link href="/app">
				<Button variant="link">App</Button>
			</Link>}
		</>
	)
}

export default LoginButton
