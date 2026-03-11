// API endpoint for contact form submissions
// This is a placeholder implementation
// In production, you would validate and store submissions properly

import type { APIRoute } from 'astro';

interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	'g-recaptcha-response': string;
}
export const GET: APIRoute = async () => {
	return new Response(JSON.stringify({ error: 'Method not allowed. Use POST to submit the contact form.' }), {
		status: 405,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const POST: APIRoute = async ({ request }) => {
	// Only accept POST requests
	if (request.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), {
			status: 405,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		const formData = await request.formData();

		const data: ContactFormData = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			subject: formData.get('subject') as string,
			message: formData.get('message') as string,
			'g-recaptcha-response': formData.get('g-recaptcha-response') as string,
		};

		// Validate required fields
		if (!data.name || !data.email || !data.subject || !data.message) {
			return new Response(
				JSON.stringify({ error: 'Missing required fields' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return new Response(
				JSON.stringify({ error: 'Invalid email address' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Verify reCAPTCHA (only in production with secret key)
		const secretKey = process.env.RECAPTCHA_SECRET_KEY;
		if (secretKey && secretKey !== 'your-secret-key') {
			try {
				const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: `secret=${secretKey}&response=${data['g-recaptcha-response']}`,
				});

				const recaptchaData = await recaptchaResponse.json() as { success: boolean; score: number };

				if (!recaptchaData.success || recaptchaData.score < 0.5) {
					return new Response(
						JSON.stringify({ error: 'reCAPTCHA verification failed' }),
						{
							status: 400,
							headers: { 'Content-Type': 'application/json' },
						}
					);
				}
			} catch (error) {
				console.error('reCAPTCHA verification error:', error);
				// Continue anyway as this is optional
			}
		}

		// TODO: In production, you would:
		// 1. Store the submission in a database
		// 2. Send an email notification to your admin
		// 3. Send a confirmation email to the user
		// 4. Implement rate limiting
		// 5. Add spam detection

		// For now, just log it
		console.log('[Contact Form Submission]', {
			name: data.name,
			email: data.email,
			subject: data.subject,
			timestamp: new Date().toISOString(),
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Thank you for your message. We will be in touch soon!',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return new Response(
			JSON.stringify({ error: 'Internal server error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};
