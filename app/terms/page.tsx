import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import {Metadata} from 'next'
import LoginButton from '@/components/LoginButton'
import {Suspense} from 'react'

export const metadata: Metadata = {
	title: 'Ticker - Terms of Use',
	description: 'Read the terms of use of Ticker to understand the rules and guidelines for using our mobile-first, ' +
		'long-duration, cloud-synced stopwatch application. By using Ticker, you agree to abide by these terms.',
	keywords: [
		'Ticker', 'terms of use', 'user agreement', 'mobile stopwatch app', 'long duration stopwatch',
		'cloud-synced stopwatch', 'usage guidelines', 'user responsibilities'
	]
}

const TermsPage = () => {
	return (
		<main className="flex flex-col items-start justify-center gap-8">
			<header className="flex justify-between items-center w-full">
				<Link href="/"><Image src={logo} alt="Ticker logo" className="w-8 h-8"/></Link>
				<Suspense>
					<LoginButton />
				</Suspense>
			</header>

			<div className="prose lg:prose-xl prose-neutral prose-invert">
				<h1 id="terms-of-use">Terms of Use</h1>
				<p><strong>Effective Date:</strong> June 6, 2024</p>
				<h2 id="1-introduction">1. Introduction</h2>
				<p>Welcome to Ticker, a mobile-first, long-duration, cloud-synced stopwatch application. These Terms of
					Use (&quot;Terms&quot;) govern your use of Ticker (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;).
					By accessing or using Ticker, you agree to be bound by these Terms. If you do not agree to these
					Terms, please do not use our application.</p>
				<h2 id="2-eligibility">2. Eligibility</h2>
				<p>You must be at least 13 years old to use Ticker. By using Ticker, you represent and warrant that you
					meet this age requirement.</p>
				<h2 id="3-user-accounts">3. User Accounts</h2>
				<p><strong>Account Creation:</strong> To use Ticker, you must log in using Google OAuth. By doing so,
					you authorize us to access certain information from your Google account, as described in our Privacy
					Policy.</p>
				<p><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of
					your account and for all activities that occur under your account. You agree to notify us
					immediately of any unauthorized use of your account.</p>
				<h2 id="4-user-conduct">4. User Conduct</h2>
				<p>By using Ticker, you agree to:</p>
				<ul>
					<li>Use the application only for lawful purposes.</li>
					<li>Not engage in any activity that could harm or disrupt Ticker or its users.</li>
					<li>Not attempt to gain unauthorized access to any part of the application or its systems.</li>
				</ul>
				<h2 id="5-data-and-privacy">5. Data and Privacy</h2>
				<p>Your use of Ticker is also governed by our Privacy Policy, which outlines how we collect, use, and
					protect your information. By using Ticker, you consent to our data practices as described in our
					Privacy Policy.</p>
				<h2 id="6-intellectual-property">6. Intellectual Property</h2>
				<p><strong>Ownership:</strong> Ticker and its content, including but not limited to text, graphics,
					logos, and software, are the property of Ticker and are protected by copyright and other
					intellectual property laws.</p>
				<p><strong>License:</strong> We grant you a limited, non-exclusive, non-transferable, and revocable
					license to use Ticker in accordance with these Terms. You may not reproduce, distribute, modify, or
					create derivative works of Ticker or its content without our prior written consent.</p>
				<h2 id="7-termination">7. Termination</h2>
				<p>We reserve the right to terminate or suspend your account and access to Ticker at our discretion,
					without notice, for conduct that we believe violates these Terms or is harmful to other users or
					us.</p>
				<h2 id="8-disclaimers-and-limitation-of-liability">8. Disclaimers and Limitation of Liability</h2>
				<p><strong>As-Is Basis:</strong> Ticker is provided on
					an &quot;as-is&quot; and &quot;as-available&quot; basis. We make no warranties, express or implied,
					regarding the availability, reliability, or accuracy of Ticker.</p>
				<p><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, Ticker shall not be
					liable for any indirect, incidental, special, or consequential damages arising out of or in
					connection with your use of the application.</p>
				<h2 id="9-changes-to-the-terms">9. Changes to the Terms</h2>
				<p>We may update these Terms from time to time. When we do, we will notify users through email and a
					notice on our website. Your continued use of Ticker after such changes constitutes your acceptance
					of the new Terms.</p>
				<h2 id="10-governing-law">10. Governing Law</h2>
				<p>These Terms shall be governed by and construed in accordance with the laws of the State of West
					Bengal, India, without regard to its conflict of law principles.</p>
				<h2 id="11-contact-us">11. Contact Us</h2>
				<p>If you have any questions or concerns about these Terms, please contact us at:</p>
				<ul>
					<li><strong>Email:</strong> <a href="mailto:subha60kundu@gmail.com">subha60kundu@gmail.com</a></li>
					<li><strong>Address:</strong> Kalyani, Nadia, West Bengal, India 741235</li>
				</ul>
				<p>By using Ticker, you agree to these Terms of Use.</p>
			</div>
		</main>
	)
}

export default TermsPage
