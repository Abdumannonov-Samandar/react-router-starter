import type { Route } from './+types/register'
import { Form, redirect, useNavigation } from 'react-router'

export function meta() {
	return [{ title: 'Register' }]
}

export async function action({ request }: Route.ActionArgs) {
	await new Promise(res => setTimeout(res, 1000))
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	console.log('[register]', data)
	return redirect('/login')
}

export default function Register() {
	const navigation = useNavigation()

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4'>
			{/* Background decorations */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>
			</div>

			<div className='relative w-full max-w-md'>
				{/* Glassmorphism container */}
				<div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl'>
					<div className='text-center mb-8'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl mb-4 shadow-lg'>
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
									d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
								/>
							</svg>
						</div>
						<h2 className='text-3xl font-bold text-white mb-2'>
							Create Account
						</h2>
						<p className='text-white/70'>Join us and start your journey</p>
					</div>

					<Form
						id='registerForm'
						method='post'
						action='/register'
						className='space-y-6'
					>
						{/* Name Input */}
						<div className='group'>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-white/90 mb-2 pl-1'
							>
								Full Name
							</label>
							<div className='relative'>
								<input
									id='name'
									type='text'
									name='name'
									maxLength={40}
									required
									className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 group-hover:border-white/30'
									placeholder='Enter your full name'
								/>
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
							</div>
						</div>

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
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
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
									placeholder='Create a password'
								/>
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							disabled={navigation.state === 'submitting'}
							className='w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-white/30'
						>
							{navigation.state === 'submitting' ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
									<span>Creating Account...</span>
								</div>
							) : (
								'Create Account'
							)}
						</button>

						{/* Login Link */}
						<div className='text-center mt-6'>
							<p className='text-white/70'>
								Already have an account?{' '}
								<a
									href='/login'
									className='text-white font-medium hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/80'
								>
									Sign in
								</a>
							</p>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
