import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import {Metadata} from 'next'
import LoginButton from '@/components/LoginButton'
import {Suspense} from 'react'

export const metadata: Metadata = {
	title: 'Ticker - Privacy Policy',
	description: 'Read the privacy policy of Ticker to understand how we collect, use, and protect your personal ' +
		'information. Ticker is a mobile-first, long-duration, cloud-synced stopwatch app that values your privacy.',
	keywords: [
		'Ticker', 'privacy policy', 'data protection', 'personal information', 'data security', 'user privacy',
		'cloud-synced', 'stopwatch', 'mobile stopwatch app', 'open source stopwatch'
	]
}

const PrivacyPage = () => {
	return (
		<main className="flex flex-col items-start justify-center gap-8">
			<header className="flex justify-between items-center w-full">
				<Link href="/"><Image src={logo} alt="Ticker logo" className="w-8 h-8"/></Link>
				<Suspense>
					<LoginButton />
				</Suspense>
			</header>

			<div className="prose lg:prose-xl prose-neutral prose-invert">
				<h1 id="privacy-policy">Privacy Policy</h1>
				<p><strong>Effective Date:</strong> June 6, 2024</p>
				<h2 id="1-introduction">1. Introduction</h2>
				<p>Welcome to Ticker. We are committed to protecting your privacy. This Privacy Policy explains how Ticker (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) collects, uses, discloses, and safeguards your information when you use our mobile-first, long-duration, cloud-synced stopwatch application.</p>
				<h2 id="2-company-information">2. Company Information</h2>
				<ul>
					<li><strong>Company Name:</strong> Ticker</li>
					<li><strong>Address:</strong> Kalyani, Nadia, West Bengal, India 741235</li>
					<li><strong>Contact Email:</strong> <a href="mailto:subha60kundu@gmail.com">subha60kundu@gmail.com</a></li>
				</ul>
				<h2 id="3-data-collection">3. Data Collection</h2>
				<p>Ticker uses Google OAuth to log users in. During this process, we collect the following data:</p>
				<ul>
					<li>User’s primary Google Account email address</li>
					<li>User’s personal information, including any personal info the user has made publicly available on Google</li>
					<li>Association of the user with their personal info on Google</li>
				</ul>
				<p>This data is collected automatically during the login process via Google OAuth.</p>
				<h2 id="4-data-usage">4. Data Usage</h2>
				<p>The data collected is used to:</p>
				<ul>
					<li>Authenticate users and provide access to the application</li>
					<li>Personalize user experience within the app</li>
				</ul>
				<p>We do not share your data with any third parties, except as required to comply with legal obligations.</p>
				<h2 id="5-data-storage-and-security">5. Data Storage and Security</h2>
				<p>The collected data is stored using Supabase&#39;s database service offering and is hosted in the Mumbai, India AWS data center. We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
				<h2 id="6-user-rights">6. User Rights</h2>
				<p><strong>Deletion:</strong> Users can delete their account at any time by sending an email from the email address associated with their account to <a href="mailto:subha60kundu@gmail.com">subha60kundu@gmail.com</a>. Upon receiving a deletion request, we will promptly delete all associated data.</p>
				<h2 id="7-cookies-and-tracking-technologies">7. Cookies and Tracking Technologies</h2>
				<p>Ticker does not use cookies or other tracking technologies. There is no onboarding or tracking involved in our application.</p>
				<h2 id="8-third-party-services">8. Third-Party Services</h2>
				<p>Ticker does not integrate any third-party services other than Google OAuth for user authentication.</p>
				<h2 id="9-children-s-privacy">9. Children’s Privacy</h2>
				<p>Ticker is not primarily intended for children. We do not knowingly collect any personal information from children under the age of 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information from our files as soon as possible.</p>
				<h2 id="10-changes-to-the-privacy-policy">10. Changes to the Privacy Policy</h2>
				<p>We may update this Privacy Policy from time to time. When we do, we will notify users through email and a notice on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
				<h2 id="11-contact-us">11. Contact Us</h2>
				<p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
				<ul>
					<li><strong>Email:</strong> <a href="mailto:subha60kundu@gmail.com">subha60kundu@gmail.com</a></li>
					<li><strong>Address:</strong> Kalyani, Nadia, West Bengal, India 741235</li>
				</ul>
				<p>By using Ticker, you consent to our Privacy Policy.</p>
			</div>
		</main>
	)
}

export default PrivacyPage
