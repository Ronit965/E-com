import React, { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes, Link, NavLink, useNavigate } from 'react-router-dom'
import './index.css'
import menImage1 from './assets/313.jpeg'
import menImage2 from './assets/314.jpeg'
import menImage3 from './assets/315.jpeg'
import menImage4 from './assets/316.jpg'
import menImage5 from './assets/317.jpeg'
import menImage6 from './assets/318.jpeg'
import menImage7 from './assets/319.png'
import menImage8 from './assets/320.jpg'
import menImage9 from './assets/321.jpeg'
import menImage10 from './assets/322.jpeg'
import menImage11 from './assets/323.jpeg'
import menImage12 from './assets/324.jpeg'
import menImage13 from './assets/325.jpeg'
import menImage14 from './assets/326.webp'
import menImage15 from './assets/327.webp'
import menImage16 from './assets/328.jpg'
import womenImage1 from './assets/331.jpeg'
import womenImage2 from './assets/332.webp'
import womenImage3 from './assets/333.jpeg'
import womenImage4 from './assets/334.jpeg'
import womenImage5 from './assets/335.png'
import womenImage6 from './assets/336.png'
import womenImage7 from './assets/337.webp'
import womenImage8 from './assets/338.jpeg'
import womenImage9 from './assets/339.jpg'
import womenImage10 from './assets/340.webp'
import womenImage11 from './assets/341.jpg'
import womenImage12 from './assets/342.jpeg'
import womenImage13 from './assets/343.jpg'
import womenImage14 from './assets/344.jpg'
import womenImage15 from './assets/345.png'
import womenImage16 from './assets/346.jpeg'
import bestSellerImage1 from './assets/313.jpeg'
import bestSellerImage2 from './assets/315.jpeg'
import bestSellerImage3 from './assets/317.jpeg'
import bestSellerImage4 from './assets/319.png'
import bestSellerImage5 from './assets/321.jpeg'
import bestSellerImage6 from './assets/323.jpeg'
import bestSellerImage7 from './assets/331.jpeg'
import bestSellerImage8 from './assets/333.jpeg'
import bestSellerImage9 from './assets/335.png'
import bestSellerImage10 from './assets/337.webp'
import bestSellerImage11 from './assets/339.jpg'
import bestSellerImage12 from './assets/341.jpg'
import todayDealImage1 from './assets/301.webp'
import saleImage1 from './assets/312.png'
import saleImage2 from './assets/316.jpg'
import saleImage3 from './assets/320.jpg'
import saleImage4 from './assets/324.jpeg'
import mixedImage1 from './assets/301.webp'
import mixedImage2 from './assets/312.png'
import mixedImage3 from './assets/315.jpeg'
import mixedImage4 from './assets/317.jpeg'
import mixedImage5 from './assets/319.png'
import mixedImage6 from './assets/321.jpeg'
import mixedImage7 from './assets/323.jpeg'
import mixedImage8 from './assets/325.jpeg'
import todayDealImage2 from './assets/312.png'
import todayDealImage3 from './assets/315.jpeg'
import todayDealImage4 from './assets/317.jpeg'
import todayDealImage5 from './assets/319.png'
import todayDealImage6 from './assets/321.jpeg'
import todayDealImage7 from './assets/331.jpeg'
import todayDealImage8 from './assets/333.jpeg'

type Theme = 'light' | 'dark'
type AuthUser = { email: string }
type CartItem = { id: string; name: string; price: number; qty: number; imageUrl?: string }

const AuthContext = createContext<{ user: AuthUser | null; setUser: (u: AuthUser | null) => void }>({ user: null, setUser: () => {} })
const CartContext = createContext<{ items: CartItem[]; addItem: (p: Omit<CartItem, 'id' | 'qty'>) => void; removeItem: (id: string) => void; clear: () => void; increment: (id: string) => void; decrement: (id: string) => void; count: number; total: number }>({ items: [], addItem: () => {}, removeItem: () => {}, clear: () => {}, increment: () => {}, decrement: () => {}, count: 0, total: 0 })

function useTheme(): [Theme, (t: Theme) => void] {
	const getInitial = (): Theme => {
		const stored = localStorage.getItem('theme') as Theme | null
		if (stored) return stored
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		return prefersDark ? 'dark' : 'light'
	}
	const [theme, setTheme] = useState<Theme>(getInitial)
	useEffect(() => {
		const root = document.documentElement
		const isDark = theme === 'dark'
		root.classList.toggle('dark', isDark)
		root.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme])
	return [theme, setTheme]
}

function Navbar() {
	const navItemClass = ({ isActive }: { isActive: boolean }) =>
		`px-3 py-2 rounded-md text-sm font-medium ${
			isActive
				? 'text-blue-600 dark:text-blue-500'
				: 'text-neutral-700 hover:text-black dark:text-gray-200 dark:hover:text-white'
		}`

	const { user, setUser } = useContext(AuthContext)
	const { count } = useContext(CartContext)
	const avatarLetter = user?.email?.[0]?.toUpperCase()
	const [menuOpen, setMenuOpen] = useState(false)

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
		setMenuOpen(false)
	}

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-neutral-800 dark:bg-neutral-900/70 dark:supports-[backdrop-filter]:bg-neutral-900/50">
			<div className="mx-auto max-w-7xl px-4">
				<div className="flex h-14 items-center justify-between">
                    <Link to="/" className="font-bold text-lg text-neutral-900 dark:text-white">PRODUCTS</Link>
					<div className="hidden md:flex items-center gap-1">
						<NavLink to="/" className={navItemClass}>HOME</NavLink>
						<NavLink to="/men" className={navItemClass}>MEN</NavLink>
						<NavLink to="/women" className={navItemClass}>WOMEN</NavLink>
						<NavLink to="/best-sellers" className={navItemClass}>BEST SELLERS</NavLink>
						<NavLink to="/today-deals" className={navItemClass}>TODAY DEALS</NavLink>
						<NavLink to="/about" className={navItemClass}>ABOUT US</NavLink>
						{count > 0 && <NavLink to="/cart" className={navItemClass}>CART ({count})</NavLink>}
					</div>
					<div className="flex items-center gap-2">
						{!user ? (
							<>
								<Link to="/login" className="inline-flex items-center rounded-md border border-neutral-300 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">LOGIN</Link>
								<Link to="/signup" className="inline-flex items-center rounded-md border border-neutral-300 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">SIGNUP</Link>
							</>
						) : (
							<div className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenuOpen(false) }}>
								<button aria-label="Profile" title={user.email} onClick={() => setMenuOpen((v) => !v)} className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center">
									{avatarLetter || 'U'}
								</button>
								{menuOpen && (
									<div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
										<button onClick={logout} className="block w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-100 dark:text-gray-200 dark:hover:bg-neutral-800">Logout</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

function HomePage() {
	return (
		<div className="text-neutral-900 dark:text-gray-100">
			<Hero />
			<MixedProducts />
			<SaleSection />
			<ReviewsSection />
		</div>
	)
}

function Hero() {
	return (
		<section className="w-full">
			<div className="mx-auto max-w-7xl px-4 py-10">
				<div className="h-64 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-purple-700 dark:to-blue-600 flex items-center justify-between p-8">
					<div>
						<h2 className="text-3xl font-bold text-white">New Season Arrivals</h2>
						<p className="mt-2 text-gray-100">Clothes, Shoes, Watches, Slippers</p>
						<Link to="/today-deals" className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-black">Shop Now</Link>
					</div>
					<div className="hidden md:block text-white opacity-80">Slider Placeholder</div>
				</div>
			</div>
		</section>
	)
}

function Card({ children }: { children: React.ReactNode }) {
	return <div className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">{children}</div>
}

function ImageModal({ isOpen, imageSrc, imageAlt, onClose }: { isOpen: boolean; imageSrc: string; imageAlt: string; onClose: () => void }) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={onClose}>
			<div className="relative max-h-[90vh] max-w-[90vw]">
				<img 
					src={imageSrc} 
					alt={imageAlt} 
					className="max-h-full max-w-full object-contain"
					onClick={(e) => e.stopPropagation()}
				/>
				<button 
					onClick={onClose}
					className="absolute right-4 top-4 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
				>
					<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	)
}

function MixedProducts() {
	const { addItem } = useContext(CartContext)
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)
	const { openModal } = useContext(ImageModalContext)
	const mixedImages = [mixedImage1, mixedImage2, mixedImage3, mixedImage4, mixedImage5, mixedImage6, mixedImage7, mixedImage8]
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">Mixed Products</h3>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => {
					const name = i === 0 ? 'T-Shirt' : i === 1 ? 'Watch' : i === 2 ? 'Shoes' : i === 3 ? 'Slipper' : i === 4 ? 'T-Shirt' : i === 5 ? 'Shoes' : i === 6 ? 'Watch' : i === 7 ? 'Slipper' : `Product ${i+1}`
					const price = Number((999 + i * 10).toFixed(0))
					return (
						<Card key={i}>
							<img 
								className="h-40 w-full object-cover bg-neutral-100 transition-transform duration-200 group-hover:scale-[1.03] dark:bg-neutral-800 cursor-pointer" 
								src={mixedImages[i]} 
								alt={name}
								onClick={() => openModal(mixedImages[i], name)}
							/>
							<div className="p-3">
								<div className="flex items-center justify-between text-sm text-neutral-800 dark:text-gray-200">
									<span>{name}</span>
									<span className="font-semibold">₹{price}</span>
								</div>
								<div className="mt-2 hidden gap-2 sm:flex">
									<button onClick={() => addItem({ name, price })} className="w-full rounded-md border border-neutral-300 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">Add to Cart</button>
									<button onClick={() => navigate(user ? '/payment' : '/login', { replace: false })} className="w-full rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-500">Buy Now</button>
								</div>
							</div>
						</Card>
					)
				})}
			</div>
		</section>
	)
}

function SaleSection() {
	const { openModal } = useContext(ImageModalContext)
	const saleImages = [saleImage1, saleImage2, saleImage3, saleImage4]
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">On Sale</h3>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => {
					const productName = i === 0 ? 'Watch' : i === 1 ? 'Shoes' : i === 2 ? 'Slipper' : 'Pant'
					return (
						<Card key={i}>
							<div className="relative h-40 bg-neutral-100 dark:bg-neutral-800">
								<img 
									className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] cursor-pointer" 
									src={saleImages[i]} 
									alt={`Sale item ${i + 1}`}
									onClick={() => openModal(saleImages[i], productName)}
								/>
								<span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{10 + i * 5}% OFF</span>
							</div>
							<div className="p-3">
								<div className="flex items-center justify-between text-sm text-neutral-800 dark:text-gray-200">
									<span>{productName}</span>
									<span className="font-semibold">₹{(799 + i * 20).toFixed(0)}</span>
								</div>
							</div>
						</Card>
					)
				})}
			</div>
		</section>
	)
}

function ReviewsSection() {
	const names = ['Ansh Kr', 'Deenu', 'Puskar', 'Vipin']
	const review = 'Men’s Collection: “Elevate your style with our exclusive men’s wear – from casuals to formals, designed for every occasion.”'
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">Customer Reviews</h3>
			<div className="grid gap-4 sm:grid-cols-2">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="rounded-xl border border-neutral-200 bg-white p-4 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-200">
						<div className="mb-2 flex items-center gap-3">
							<div className="h-10 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
							<div>
								<div className="font-medium">{names[i]}</div>
								<div className="text-xs text-neutral-500 dark:text-gray-400">Verified Buyer</div>
							</div>
						</div>
						<p>{review}</p>
					</div>
				))}
			</div>
		</section>
	)
}

function ProductsGrid({ title, count, getName, getImage }: { title: string; count: number; getName?: (indexZeroBased: number) => string; getImage?: (indexZeroBased: number) => string }) {
	const { addItem } = useContext(CartContext)
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)
	const { openModal } = useContext(ImageModalContext)
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h3 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: count }).map((_, i) => {
					const name = getName ? getName(i) : `Product ${i+1}`
					const price = Number((1099 + i * 15).toFixed(0))
					const image = getImage ? getImage(i) : ''
					return (
						<Card key={i}>
							{image ? (
								<img 
									className="h-48 w-full object-cover bg-neutral-100 transition-transform duration-200 group-hover:scale-[1.03] dark:bg-neutral-800 cursor-pointer" 
									src={image} 
									alt={name}
									onClick={() => openModal(image, name)}
								/>
							) : (
								<div className="h-48 bg-neutral-100 dark:bg-neutral-800" />
							)}
							<div className="p-3">
								<div className="flex items-center justify-between text-sm text-neutral-800 dark:text-gray-200">
									<span>{name}</span>
									<span className="font-semibold">₹{price}</span>
								</div>
								<div className="mt-2 hidden gap-2 sm:flex">
									<button onClick={() => addItem({ name, price })} className="w-full rounded-md border border-neutral-300 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">Add to Cart</button>
									<button onClick={() => navigate(user ? '/payment' : '/login', { replace: false })} className="w-full rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-500">Buy Now</button>
								</div>
							</div>
						</Card>
					)
				})}
			</div>
		</section>
	)
}

function AboutPage() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h1 className="text-3xl font-bold text-neutral-900 dark:text-white">About Us</h1>
			<p className="mt-3 text-neutral-600 dark:text-gray-300">We are a modern e-commerce brand bringing premium fashion to everyone. Our mission is to deliver quality, comfort, and style at great prices.</p>
			<div className="mt-8 grid gap-6 sm:grid-cols-3">
				<div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
					<h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Categories</h2>
					<ul className="mt-3 list-disc pl-5 text-neutral-700 dark:text-gray-300">
						<li>Men’s Wear: T-Shirts, Jeans, Shoes, Watches, Slippers</li>
						<li>Women’s Wear: Dresses, Jeans, Shoes, Watches, Slippers</li>
					</ul>
				</div>
				<div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
					<h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Our Promise</h2>
					<p className="mt-3 text-neutral-700 dark:text-gray-300">Fast delivery, easy returns, secure payments, and responsive support to keep your shopping worry‑free.</p>
				</div>
				<div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
					<h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Contact</h2>
					<p className="mt-3 text-neutral-700 dark:text-gray-300">Email: support@example.com<br/>Phone: +91-98765-43210</p>
				</div>
			</div>
		</section>
	)
}

function MenPage() {
	const getName = (i: number): string => {
		const n = i + 1
		if (n === 1 || n === 2) return 'T-Shirt'
		if (n === 3 || n === 4) return 'jeans'
		if (n >= 5 && n <= 8) return 'Watch'
		if (n >= 9 && n <= 12) return 'Shoes'
		if (n >= 13 && n <= 16) return 'Slipper'
		return `Product ${n}`
	}
	const getImage = (i: number): string => {
		const n = i + 1
		if (n === 1) return menImage1
		if (n === 2) return menImage2
		if (n === 3) return menImage3
		if (n === 4) return menImage4
		if (n === 5) return menImage5
		if (n === 6) return menImage6
		if (n === 7) return menImage7
		if (n === 8) return menImage8
		if (n === 9) return menImage9
		if (n === 10) return menImage10
		if (n === 11) return menImage11
		if (n === 12) return menImage12
		if (n === 13) return menImage13
		if (n === 14) return menImage14
		if (n === 15) return menImage15
		if (n === 16) return menImage16
		return ''
	}
	return <ProductsGrid title="Men" count={16} getName={getName} getImage={getImage} />
}

function WomenPage() {
	const getName = (i: number): string => {
		const n = i + 1
		if (n === 1 || n === 2) return 'T-Shirt'
		if (n === 3 || n === 4) return 'jeans'
		if (n >= 5 && n <= 8) return 'Watch'
		if (n >= 9 && n <= 12) return 'Shoes'
		if (n >= 13 && n <= 16) return 'Slipper'
		return `Product ${n}`
	}
	const getImage = (i: number): string => {
		const n = i + 1
		if (n === 1) return womenImage1
		if (n === 2) return womenImage2
		if (n === 3) return womenImage3
		if (n === 4) return womenImage4
		if (n === 5) return womenImage5
		if (n === 6) return womenImage6
		if (n === 7) return womenImage7
		if (n === 8) return womenImage8
		if (n === 9) return womenImage9
		if (n === 10) return womenImage10
		if (n === 11) return womenImage11
		if (n === 12) return womenImage12
		if (n === 13) return womenImage13
		if (n === 14) return womenImage14
		if (n === 15) return womenImage15
		if (n === 16) return womenImage16
		return ''
	}
	return <ProductsGrid title="Women" count={16} getName={getName} getImage={getImage} />
}

function BestSellersPage() {
	const getName = (i: number): string => {
		const n = i + 1
		if (n === 1 || n === 7) return 'T-Shirt'
		if (n === 2 || n === 8) return 'jeans'
		if (n === 3 || n === 4 || n === 9 || n === 10) return 'Watch'
		if (n === 5 || n === 6 || n === 11 || n === 12) return 'Shoes'
		return `Product ${n}`
	}
	const getImage = (i: number): string => {
		const n = i + 1
		if (n === 1) return bestSellerImage1
		if (n === 2) return bestSellerImage2
		if (n === 3) return bestSellerImage3
		if (n === 4) return bestSellerImage4
		if (n === 5) return bestSellerImage5
		if (n === 6) return bestSellerImage6
		if (n === 7) return bestSellerImage7
		if (n === 8) return bestSellerImage8
		if (n === 9) return bestSellerImage9
		if (n === 10) return bestSellerImage10
		if (n === 11) return bestSellerImage11
		if (n === 12) return bestSellerImage12
		return ''
	}
	return <ProductsGrid title="Best Sellers" count={12} getName={getName} getImage={getImage} />
}

function TodayDealsPage() {
	const getName = (i: number): string => {
		const n = i + 1
		if (n === 1) return 'Premium T-Shirt'
		if (n === 2) return 'Classic Watch'
		if (n === 3) return 'Designer Jeans'
		if (n === 4) return 'Sports Shoes'
		if (n === 5) return 'Smart Watch'
		if (n === 6) return 'Shoes'
		if (n === 7) return 'Elegant Dress'
		if (n === 8) return 'Jeans'
		return `Deal ${n}`
	}
	const getImage = (i: number): string => {
		const n = i + 1
		if (n === 1) return todayDealImage1
		if (n === 2) return todayDealImage2
		if (n === 3) return todayDealImage3
		if (n === 4) return todayDealImage4
		if (n === 5) return todayDealImage5
		if (n === 6) return todayDealImage6
		if (n === 7) return todayDealImage7
		if (n === 8) return todayDealImage8
		return ''
	}
	return <ProductsGrid title="Today Deals" count={8} getName={getName} getImage={getImage} />
}

function CartPage() {
	const { items, total, clear, removeItem, increment, decrement } = useContext(CartContext)
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)
	return (
		<section className="mx-auto max-w-7xl px-4 py-10">
			<h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">Your Cart</h1>
			{items.length === 0 ? (
				<p className="text-neutral-600 dark:text-gray-400">Your cart is empty.</p>
			) : (
				<div className="grid gap-4">
					{items.map(item => (
						<div key={item.id} className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
							<div className="flex items-center gap-3">
								{item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 rounded bg-neutral-200 dark:bg-neutral-800" />}
								<div>
									<div className="font-medium text-neutral-900 dark:text-white">{item.name}</div>
									<div className="mt-1 flex items-center gap-2 text-sm text-neutral-600 dark:text-gray-400">
										<button onClick={() => decrement(item.id)} className="h-7 w-7 rounded border border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">-</button>
										<span className="min-w-[2ch] text-center">{item.qty}</span>
										<button onClick={() => increment(item.id)} className="h-7 w-7 rounded border border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">+</button>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="font-semibold text-neutral-900 dark:text-white">₹{item.price * item.qty}</div>
								<button onClick={() => removeItem(item.id)} className="rounded-md border border-neutral-300 px-3 py-1 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">Remove</button>
							</div>
						</div>
					))}
					<div className="flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
						<div className="text-neutral-700 dark:text-gray-300">Total</div>
						<div className="font-semibold text-neutral-900 dark:text-white">₹{total}</div>
					</div>
					<div className="flex gap-3">
						<button onClick={clear} className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800">Clear Cart</button>
						<button onClick={() => navigate(user ? '/payment' : '/login')} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">Checkout</button>
					</div>
				</div>
			)}
		</section>
	)
}

function PaymentPage() {
	const { total, clear } = useContext(CartContext)
	const navigate = useNavigate()
	const submitPayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const paymentMethod = formData.get('method') as string
		
		// Validate form based on selected payment method
		if (paymentMethod === 'upi') {
			const upiId = formData.get('upiId') as string
			if (!upiId || upiId.trim() === '') {
				alert('Please fill in your UPI ID')
				return
			}
		} else if (paymentMethod === 'card') {
			const cardNumber = formData.get('cardNumber') as string
			const nameOnCard = formData.get('nameOnCard') as string
			const expiry = formData.get('expiry') as string
			const cvv = formData.get('cvv') as string
			
			if (!cardNumber || cardNumber.trim() === '' || 
				!nameOnCard || nameOnCard.trim() === '' || 
				!expiry || expiry.trim() === '' || 
				!cvv || cvv.trim() === '') {
				alert('Please fill in all card information')
				return
			}
		}
		
		// If validation passes, proceed to payment success
		clear()
		navigate('/payment-success')
	}
	return (
		<section className="mx-auto max-w-3xl px-4 py-10">
			<h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">Payment</h1>
			<div className="mb-4 text-neutral-700 dark:text-gray-300">Amount to pay: <span className="font-semibold">₹{total}</span></div>
			<form onSubmit={submitPayment} className="grid gap-6">
				<div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
					<label className="flex items-center gap-2 text-neutral-800 dark:text-gray-200">
						<input type="radio" name="method" value="upi" defaultChecked />
						<span>UPI</span>
					</label>
					<input name="upiId" placeholder="yourname@upi" className="mt-3 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
				</div>
				<div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
					<label className="flex items-center gap-2 text-neutral-800 dark:text-gray-200">
						<input type="radio" name="method" value="card" />
						<span>Card</span>
					</label>
					<div className="mt-3 grid gap-3 sm:grid-cols-2">
						<input name="cardNumber" placeholder="Card number" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
						<input name="nameOnCard" placeholder="Name on card" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
						<input name="expiry" placeholder="MM/YY" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
						<input name="cvv" placeholder="CVV" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
					</div>
				</div>
				<button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">Pay Securely</button>
			</form>
		</section>
	)
}

function PaymentSuccessPage() {
	const navigate = useNavigate()
	
	React.useEffect(() => {
		// Auto redirect to home page after 5 seconds
		const timer = setTimeout(() => {
			navigate('/')
		}, 5000)
		
		// Cleanup timer if component unmounts
		return () => clearTimeout(timer)
	}, [navigate])
	
	return (
		<section className="mx-auto max-w-3xl px-4 py-10">
			<div className="text-center">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
					<svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">Payment Successful!</h1>
				<p className="mb-6 text-lg text-neutral-700 dark:text-gray-300">
					Your payment was processed successfully. Thank you for your purchase!
				</p>
				<div className="mb-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm text-green-800 dark:text-green-200">
						You will be redirected to the home page in 5 seconds...
					</p>
				</div>
				<button 
					onClick={() => navigate('/')}
					className="rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-500 transition-colors"
				>
					Return to Home
				</button>
			</div>
		</section>
	)
}

function Footer() {
	return (
		<footer className="border-t border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-gray-300">
			<div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-3">
      <div>
					<div className="font-bold text-neutral-900 dark:text-white">PRODUCTS</div>
					<p className="mt-2 text-sm text-neutral-600 dark:text-gray-400">Modern fashion store.</p>
				</div>
				<div className="text-sm">
					<div className="font-semibold text-neutral-900 dark:text-white">Links</div>
					<ul className="mt-2 space-y-1">
						<li><Link to="/about" className="hover:text-black dark:hover:text-white">About Us</Link></li>
						<li><Link to="/contact" className="hover:text-black dark:hover:text-white">Contact</Link></li>
						<li><Link to="/privacy" className="hover:text-black dark:hover:text-white">Privacy Policy</Link></li>
						<li><Link to="/terms" className="hover:text-black dark:hover:text-white">Terms</Link></li>
					</ul>
				</div>
				<div className="text-sm">
					<div className="font-semibold text-neutral-900 dark:text-white">Follow</div>
					<div className="mt-2 flex gap-3 text-neutral-500 dark:text-gray-400">
						<span>Facebook</span>
						<span>Instagram</span>
						<span>Twitter</span>
					</div>
					<div className="mt-4 font-semibold text-neutral-900 dark:text-white">Payments</div>
					<div className="mt-2 flex gap-3 text-neutral-500 dark:text-gray-400">
						<span>Visa</span>
						<span>MasterCard</span>
						<span>UPI</span>
						<span>PayPal</span>
					</div>
				</div>
      </div>
			<div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-gray-500">© {new Date().getFullYear()} PRODUCTS</div>
		</footer>
	)
}

function AuthLayout({ title, onSubmit, submitText }: { title: string; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; submitText: string }) {
	return (
		<div className="mx-auto max-w-md px-4 py-10">
			<h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">{title}</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<input type="email" name="email" required placeholder="Email" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
				<input type="password" name="password" required placeholder="Password" className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white" />
				<button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">{submitText}</button>
			</form>
			<div className="mt-4 text-center text-sm text-neutral-700 dark:text-gray-300">
				{title === 'Login' ? (
					<span>Don t have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link></span>
				) : (
					<span>Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link></span>
				)}
			</div>
		</div>
	)
}

function LoginPage() {
	const navigate = useNavigate()
	const { setUser } = useContext(AuthContext)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const formData = new FormData(form)
		const email = String(formData.get('email') || '')
		setUser({ email })
		localStorage.setItem('user', JSON.stringify({ email }))
		navigate('/')
	}
	return <AuthLayout title="Login" onSubmit={handleSubmit} submitText="Login" />
}

function SignupPage() {
	const navigate = useNavigate()
	const { setUser } = useContext(AuthContext)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const formData = new FormData(form)
		const email = String(formData.get('email') || '')
		setUser({ email })
		localStorage.setItem('user', JSON.stringify({ email }))
		navigate('/')
	}
	return <AuthLayout title="Sign Up" onSubmit={handleSubmit} submitText="Create Account" />
}

const ImageModalContext = createContext<{
	isOpen: boolean
	imageSrc: string
	imageAlt: string
	openModal: (src: string, alt: string) => void
	closeModal: () => void
}>({
	isOpen: false,
	imageSrc: '',
	imageAlt: '',
	openModal: () => {},
	closeModal: () => {}
})

export default function App() {
	useTheme()
	const [user, setUser] = useState<AuthUser | null>(() => {
		try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
	})
	const [cart, setCart] = useState<CartItem[]>(() => {
		try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
	})
	const [modalState, setModalState] = useState({
		isOpen: false,
		imageSrc: '',
		imageAlt: ''
	})
	const openModal = (src: string, alt: string) => setModalState({ isOpen: true, imageSrc: src, imageAlt: alt })
	const closeModal = () => setModalState({ isOpen: false, imageSrc: '', imageAlt: '' })
	useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
	const addItem = (p: Omit<CartItem, 'id' | 'qty'>) => {
		setCart(prev => {
			const existing = prev.find(it => it.name === p.name && it.price === p.price)
			if (existing) return prev.map(it => it === existing ? { ...it, qty: it.qty + 1 } : it)
			return [...prev, { id: Math.random().toString(36).slice(2), name: p.name, price: p.price, qty: 1, imageUrl: p.imageUrl }]
		})
	}
	const removeItem = (id: string) => setCart(prev => prev.filter(it => it.id !== id))
	const clear = () => setCart([])
	const increment = (id: string) => setCart(prev => prev.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it))
	const decrement = (id: string) => setCart(prev => prev.flatMap(it => {
		if (it.id !== id) return [it]
		const q = it.qty - 1
		return q <= 0 ? [] : [{ ...it, qty: q }]
	}))
	const count = cart.reduce((s, it) => s + it.qty, 0)
	const total = cart.reduce((s, it) => s + it.qty * it.price, 0)
	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ user, setUser }}>
			<CartContext.Provider value={{ items: cart, addItem, removeItem, clear, increment, decrement, count, total }}>
			<ImageModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
			<div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/men" element={<MenPage />} />
					<Route path="/women" element={<WomenPage />} />
					<Route path="/best-sellers" element={<BestSellersPage />} />
					<Route path="/today-deals" element={<TodayDealsPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="/payment-success" element={<PaymentSuccessPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="*" element={<div className="p-6">Not Found</div>} />
				</Routes>
				<Footer />
				<ImageModal 
					isOpen={modalState.isOpen} 
					imageSrc={modalState.imageSrc} 
					imageAlt={modalState.imageAlt} 
					onClose={closeModal} 
				/>
			</div>
			</ImageModalContext.Provider>
			</CartContext.Provider>
			</AuthContext.Provider>
		</BrowserRouter>
	)
}