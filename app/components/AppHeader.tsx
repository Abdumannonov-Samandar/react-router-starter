// import { Link, useLocation } from 'react-router'

// export default function AppHeader({ hasUser }: { hasUser?: boolean }) {
// 	const location = useLocation()

// 	// Agar hasUser prop berilmagan bo'lsa, URL ga qarab aniqlash
// 	const isUserLoggedIn =
// 		hasUser !== undefined ? hasUser : location.pathname === '/'

// 	// Login va Register sahifalarda header ko'rsatmaslik
// 	if (location.pathname === '/login' || location.pathname === '/register') {
// 		return null
// 	}
// 	return (
// 		<header className='relative backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4 shadow-lg'>
// 			{/* Background gradient overlay */}
// 			<div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10'></div>

// 			<div className='relative flex items-center justify-between max-w-7xl mx-auto'>
// 				{/* Logo Section */}
// 				<div className='flex items-center space-x-3'>
// 					<div className='relative'>
// 						<div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center'>
// 							<svg
// 								className='w-6 h-6 text-white'
// 								fill='none'
// 								stroke='currentColor'
// 								viewBox='0 0 24 24'
// 							>
// 								<path
// 									strokeLinecap='round'
// 									strokeLinejoin='round'
// 									strokeWidth={2}
// 									d='M13 10V3L4 14h7v7l9-11h-7z'
// 								/>
// 							</svg>
// 						</div>
// 						<div className='absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white/20 animate-pulse'></div>
// 					</div>
// 					<div>
// 						<h2 className='text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
// 							Starter
// 						</h2>
// 						<div className='w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full'></div>
// 					</div>
// 				</div>

// 				{/* Navigation */}
// 				{!isUserLoggedIn && (
// 					<nav className='flex items-center'>
// 						<div className='flex items-center space-x-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1'>
// 							<Link
// 								to='/login'
// 								viewTransition
// 								className='group relative px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10'
// 							>
// 								<span className='relative z-10'>Login</span>
// 								<div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
// 							</Link>

// 							<div className='w-px h-6 bg-white/20'></div>

// 							<Link
// 								to='/register'
// 								viewTransition
// 								className='group relative px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
// 							>
// 								<span className='relative z-10'>Register</span>
// 								<div className='absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
// 							</Link>
// 						</div>
// 					</nav>
// 				)}

// 				{isUserLoggedIn && (
// 					<nav className='flex items-center space-x-4'>
// 						{/* User Avatar */}
// 						<div className='flex items-center space-x-3'>
// 							<div className='relative'>
// 								<div className='w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg flex items-center justify-center'>
// 									<svg
// 										className='w-5 h-5 text-white'
// 										fill='none'
// 										stroke='currentColor'
// 										viewBox='0 0 24 24'
// 									>
// 										<path
// 											strokeLinecap='round'
// 											strokeLinejoin='round'
// 											strokeWidth={2}
// 											d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
// 										/>
// 									</svg>
// 								</div>
// 								<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 flex items-center justify-center'>
// 									<div className='w-2 h-2 bg-white rounded-full'></div>
// 								</div>
// 							</div>

// 							<div className='hidden sm:block'>
// 								<p className='text-sm font-medium text-white'>Welcome back!</p>
// 								<p className='text-xs text-white/60'>Online now</p>
// 							</div>
// 						</div>

// 						{/* Logout Button */}
// 						<div className='flex items-center space-x-2'>
// 							<button className='relative group px-4 py-2 bg-white/5 hover:bg-red-500/20 backdrop-blur-sm border border-white/10 hover:border-red-400/30 rounded-xl text-white/90 hover:text-red-300 transition-all duration-200'>
// 								<a
// 									href='/logout'
// 									className='flex items-center space-x-2 text-sm font-medium'
// 								>
// 									<svg
// 										className='w-4 h-4'
// 										fill='none'
// 										stroke='currentColor'
// 										viewBox='0 0 24 24'
// 									>
// 										<path
// 											strokeLinecap='round'
// 											strokeLinejoin='round'
// 											strokeWidth={2}
// 											d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
// 										/>
// 									</svg>
// 									<span>Logout</span>
// 								</a>
// 								<div className='absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
// 							</button>
// 						</div>
// 					</nav>
// 				)}
// 			</div>

// 			{/* Bottom glow effect */}
// 			<div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
// 		</header>
// 	)
// }
