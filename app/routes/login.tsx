import type { Route } from './+types/login'
import { userCookie } from '~/lib/cookies.server'
import { data, Form, redirect, useNavigation } from 'react-router'

export function meta() {
	return [{ title: 'Login' }]
}

export async function action({ request }: Route.ActionArgs) {
	const { email, password } = Object.fromEntries(await request.formData())
	const message = 'Invalid credentials, try again.'
	const isValidCredentials = email === 'admin@test.com' && password === 'abc123'

	await new Promise(res => setTimeout(res, 1000))

	console.log('[login]', { email, password })

	if (!isValidCredentials) return data({ message }, { status: 400 })

	return redirect('/', {
		status: 302,
		headers: {
			'Set-Cookie': await userCookie.serialize('user-test'),
		},
	})
}

export default function Login({ actionData }: Route.ComponentProps) {
	const navigation = useNavigation()

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4'>
			{/* Background decorations */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
				<div className='absolute top-1/3 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl'></div>
				<div className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl'></div>
			</div>

			<div className='relative w-full max-w-md'>
				{/* Error Message */}
				{actionData && (
					<div className='mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm'>
						<div className='flex items-center space-x-3'>
							<div className='flex-shrink-0'>
								<svg
									className='w-5 h-5 text-red-300'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z'
									/>
								</svg>
							</div>
							<p className='text-red-100 text-sm font-medium'>
								{actionData.message ??
									'Sorry for that, try again in few minutes, please.'}
							</p>
						</div>
					</div>
				)}

				{/* Glassmorphism container */}
				<div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl'>
					<div className='text-center mb-8'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl mb-4 shadow-lg'>
							<svg
								className='w-8 h-8 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
								/>
							</svg>
						</div>
						<h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
						<p className='text-white/70'>Sign in to your account</p>
					</div>

					<Form
						id='loginForm'
						method='post'
						action='/login'
						className='space-y-6'
					>
						{/* Email Input */}
						<div className='group'>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-white/90 mb-2 pl-1'
							>
								Email Address
							</label>
							<div className='relative'>
								<input
									id='email'
									type='email'
									name='email'
									maxLength={120}
									required
									className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30'
									placeholder='Enter your email'
								/>
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
							</div>
						</div>

						{/* Password Input */}
						<div className='group'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-white/90 mb-2 pl-1'
							>
								Password
							</label>
							<div className='relative'>
								<input
									id='password'
									type='password'
									name='password'
									maxLength={40}
									required
									className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30'
									placeholder='Enter your password'
								/>
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
							</div>
						</div>

						{/* Forgot Password Link */}
						<div className='text-right'>
							<a
								href='#'
								className='text-sm text-white/70 hover:text-white transition-colors duration-200 underline decoration-white/30 hover:decoration-white/70'
							>
								Forgot password?
							</a>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={navigation.state === 'submitting'}
							className='w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-white/30'
						>
							{navigation.state === 'submitting' ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
									<span>Signing In...</span>
								</div>
							) : (
								'Sign In'
							)}
						</button>

						{/* Register Link */}
						<div className='text-center mt-6'>
							<p className='text-white/70'>
								Don't have an account?{' '}
								<a
									href='/register'
									className='text-white font-medium hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/80'
								>
									Create account
								</a>
							</p>
						</div>

						{/* Demo Credentials */}
						<div className='mt-6 p-4 bg-white/5 border border-white/10 rounded-2xl'>
							<p className='text-xs text-white/60 text-center mb-2'>
								Demo Credentials:
							</p>
							<div className='text-xs text-white/80 space-y-1'>
								<p>
									<span className='text-white/60'>Email:</span> admin@test.com
								</p>
								<p>
									<span className='text-white/60'>Password:</span> abc123
								</p>
							</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
