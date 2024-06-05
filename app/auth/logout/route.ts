import {createClient} from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
	const supabase = createClient()
	await supabase.auth.signOut()
	return redirect('/')
}