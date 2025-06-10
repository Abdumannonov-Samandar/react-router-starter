import { Suspense } from 'react'
import type { Route } from './+types/home'
import { Welcome } from '~/welcome/welcome'
import { Await, redirect } from 'react-router'
import { isAuthenticated } from '~/lib/cookies.server'

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ time: unknown } | Response> {
	return isAuthenticated(request).then(flag => {
		if (!flag) return redirect('/login', { status: 302 })
		const timePromise = new Promise(resolve =>
			setTimeout(() => resolve(new Date().toISOString()), 1000)
		)
		return { time: timePromise }
	})
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
			{/* Background decorations */}
			<div className='absolute inset-0'>
				<div className='absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
				<div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl'></div>
			</div>

			{/* Navigation */}
			<nav className='relative z-10 p-6'>
				<div className='max-w-7xl mx-auto flex justify-between items-center'>
					<div className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg'></div>
						<span className='text-xl font-bold text-white'>Dashboard</span>
					</div>
					<div className='flex items-center space-x-4'>
						<div className='w-8 h-8 bg-white/10 rounded-full backdrop-blur-sm border border-white/20'></div>
						<button onClick={() => isAuthenticated} className='px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all duration-200'>
							Logout
						</button>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
				{/* Welcome Section */}
				<div className='text-center mb-16'>
					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl'>
						<Welcome />
					</div>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-white/70 text-sm'>Active Users</p>
								<p className='text-2xl font-bold text-white'>2,543</p>
							</div>
							<div className='w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-white/70 text-sm'>Revenue</p>
								<p className='text-2xl font-bold text-white'>$12,847</p>
							</div>
							<div className='w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-white/70 text-sm'>Growth</p>
								<p className='text-2xl font-bold text-white'>+24.5%</p>
							</div>
							<div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center'>
								<svg
									className='w-6 h-6 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Time Display */}
				<div className='text-center'>
					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 inline-block'>
						<h3 className='text-xl font-semibold text-white mb-4'>
							Current Time
						</h3>
						<Suspense
							fallback={
								<div className='flex items-center justify-center space-x-2'>
									<div className='w-4 h-4 bg-white/30 rounded-full animate-pulse'></div>
									<div className='w-4 h-4 bg-white/30 rounded-full animate-pulse delay-100'></div>
									<div className='w-4 h-4 bg-white/30 rounded-full animate-pulse delay-200'></div>
									<span className='text-white/60 ml-2'>Loading time...</span>
								</div>
							}
						>
							<Await resolve={!(loaderData instanceof Response) ? loaderData?.time : undefined}>
								{time => (
									<div className='text-center'>
										<p className='text-2xl font-mono text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
											{time ? new Date(time).toLocaleString() : 'Loading...'}
										</p>
										<p className='text-sm text-white/60 mt-2'>
											Server timestamp
										</p>
									</div>
								)}
							</Await>
						</Suspense>
					</div>
				</div>

				{/* Additional Content */}
				<div className='mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6'>
						<h3 className='text-xl font-semibold text-white mb-4'>
							Quick Actions
						</h3>
						<div className='space-y-3'>
							<button className='w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10'>
								Create New Project
							</button>
							<button className='w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10'>
								View Analytics
							</button>
							<button className='w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition-all duration-200 border border-white/10'>
								Manage Users
							</button>
						</div>
					</div>

					<div className='backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6'>
						<h3 className='text-xl font-semibold text-white mb-4'>
							Recent Activity
						</h3>
						<div className='space-y-4'>
							<div className='flex items-center space-x-3'>
								<div className='w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center'>
									<div className='w-2 h-2 bg-white rounded-full'></div>
								</div>
								<div>
									<p className='text-white text-sm'>New user registered</p>
									<p className='text-white/60 text-xs'>2 minutes ago</p>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
								<div className='w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center'>
									<div className='w-2 h-2 bg-white rounded-full'></div>
								</div>
								<div>
									<p className='text-white text-sm'>Payment processed</p>
									<p className='text-white/60 text-xs'>5 minutes ago</p>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
								<div className='w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center'>
									<div className='w-2 h-2 bg-white rounded-full'></div>
								</div>
								<div>
									<p className='text-white text-sm'>Report generated</p>
									<p className='text-white/60 text-xs'>10 minutes ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
