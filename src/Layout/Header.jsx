import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import md5 from '../lib/md5'
import { Link } from "react-router-dom"
import { fetchCategoriesIfNeeded } from '../store/actions/productActions'
import { logout } from '../store/actions/clientActions'
import ShoppingCartDropdown from '../components/ShoppingCartDropdown'
import {
    Search,
    ShoppingCart,
    Menu,
    X,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Heart
} from "lucide-react"

export default function Header() {
    const [open, setOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    const [shopOpen, setShopOpen] = useState(false)
    const shopRef = useRef(null)
    const closeTimer = useRef(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.client.user)
    const { cart } = useSelector(state => state.cart)
    const categories = useSelector(state => {
        const productState = state.product || {}
        return productState.categories || []
    })

    // Calculate total items in cart
    const totalCartItems = cart.reduce((total, item) => total + item.count, 0)

    useEffect(() => {
        document.documentElement.style.setProperty('--mobile-menu-offset', open ? '140px' : '0px')
    }, [open])

    // Load categories for the dropdown once
    useEffect(() => {
        dispatch(fetchCategoriesIfNeeded())
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logout())
        setUserMenuOpen(false)
        setOpen(false)
    }

    const handleShopEnter = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        setShopOpen(true)
    }
    const handleShopLeave = () => {
        closeTimer.current = setTimeout(() => setShopOpen(false), 120)
    }

    // Helpers for category links
    const slugify = (s='') => s.toLowerCase()
        .replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
    const genderPath = g => g === 'k' ? 'kadin' : 'erkek'
    const topWomen = (Array.isArray(categories) ? categories.filter(c=>c.gender==='k') : [])
        .sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,5)
    const topMen = (Array.isArray(categories) ? categories.filter(c=>c.gender!=='k') : [])
        .sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,5)

    return (
        <>
            <header className="fixed top-0 left-0 z-40 w-full bg-white">
                {/* TOPBAR (desktop only) */}
                <div className="hidden md:flex items-center justify-between px-16 
                lg:px-16 py-2 bg-[#2d2f3a] font-bold text-white text-xs">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>(225) 555-0118</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>michelle.rivera@example.com</span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <span>Follow us and get a chance to win 80% off</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden lg:inline">Follow Us :</span>
                        <a href="#" aria-label="Instagram" className="text-white hover:opacity-100">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#" aria-label="YouTube" className="text-white hover:opacity-100">
                            <Youtube className="w-4 h-4" />
                        </a>
                        <a href="#" aria-label="Facebook" className="text-white hover:opacity-100">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-white hover:opacity-100">
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* NAVBAR */}
                <div className="flex items-center justify-between w-full px-16 py-3 bg-white">
                    {/* Left: Logo */}
                    <Link to="/" className="font-bold text-3xl md:text-2xl">
                        Bandage
                    </Link>

                    {/* Mobil ikonlar (md altında) */}
                    <div className="flex items-center gap-2 md:hidden ml-auto">
                        {!searchOpen ? (
                            <button 
                                aria-label="Search" 
                                className="p-2 rounded hover:bg-gray-100"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        ) : (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-2 py-1 border border-gray-300 rounded-l text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button
                                    className="px-2 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                                    onClick={() => setSearchOpen(false)}
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="relative">
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                aria-label="Cart"
                                className="p-2 rounded hover:bg-gray-100 flex items-center gap-1"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalCartItems > 0 && (
                                    <span className="text-[#23A6F0] text-xs font-bold">
                                        {totalCartItems}
                                    </span>
                                )}
                            </button>
                            <ShoppingCartDropdown
                                isOpen={cartOpen}
                                onClose={() => setCartOpen(false)}
                            />
                        </div>
                        <button
                            aria-label="Menu"
                            onClick={() => setOpen(o => !o)}
                            className="p-2 rounded hover:bg-gray-100"
                        >
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500">
                            <Link to="/" className="hover:text-black">Home</Link>



                            <div
                                ref={shopRef}
                                className="relative"
                                onMouseEnter={handleShopEnter}
                                onMouseLeave={handleShopLeave}
                            >
                                {/* Tetikleyici */}
                                <Link
                                    to="/shop"
                                    className="hover:text-black"
                                >
                                    Shop
                                    <span className="text-gray-400">▾</span>
                                </Link>

                                {/* DROPDOWN PANEL */}
                                {shopOpen && (
                                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                                        onMouseEnter={handleShopEnter}
                                        onMouseLeave={handleShopLeave}>

                                        <div
                                            className="bg-gray-100 border shadow-xl
                                            p-6 z-50 text-left"
                                            role="menu"
                                        >
                                            {/* İkili kolon: sadece flex */}
                                            <div className="flex gap-12">
                                                {/* Kadın */}
                                                <div className="min-w-[160px]">
                                                    <div className="text-sm font-bold text-[#252B42] mb-6">Kadın</div>
                                                    <ul className="flex flex-col gap-2 text-gray-500">
                                                        {topWomen.length > 0 ? topWomen.map(cat => (
                                                            <li key={cat.id}>
                                                                <Link
                                                                    to={`/shop/kadin/${slugify(cat.title)}/${cat.id}`}
                                                                    className="hover:text-black"
                                                                >
                                                                    {cat.title}
                                                                </Link>
                                                            </li>
                                                        )) : (
                                                            <>
                                                                <li><Link to="/shop/kadin/ayakkabi/1" className="hover:text-black">Ayakkabı</Link></li>
                                                                <li><Link to="/shop/kadin/giyim/2" className="hover:text-black">Giyim</Link></li>
                                                                <li><Link to="/shop/kadin/aksesuar/3" className="hover:text-black">Aksesuar</Link></li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>

                                                {/* Erkek */}
                                                <div className="min-w-[160px]">
                                                    <div className="text-sm font-bold text-[#252B42] mb-6">Erkek</div>
                                                    <ul className="flex flex-col gap-2 text-gray-500">
                                                        {topMen.length > 0 ? topMen.map(cat => (
                                                            <li key={cat.id}>
                                                                <Link
                                                                    to={`/shop/erkek/${slugify(cat.title)}/${cat.id}`}
                                                                    className="hover:text-black"
                                                                >
                                                                    {cat.title}
                                                                </Link>
                                                            </li>
                                                        )) : (
                                                            <>
                                                                <li><Link to="/shop/erkek/ayakkabi/4" className="hover:text-black">Ayakkabı</Link></li>
                                                                <li><Link to="/shop/erkek/gomlek/5" className="hover:text-black">Gömlek</Link></li>
                                                                <li><Link to="/shop/erkek/pantolon/6" className="hover:text-black">Pantolon</Link></li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>




                            <Link to="/about" className="hover:text-black">About</Link>
                            <Link to="/team" className="hover:text-black">Team</Link>
                            <Link to="/pricing" className="hover:text-black">Pricing</Link>
                            <Link to="/contact" className="hover:text-black">Contact</Link>
                        </nav>
                    </div>

                    {/* Right icons */}
                    <div className="hidden md:flex items-center font-bold text-sm text-[#23A6F0] gap-3">
                        {user ? (
                          <div className="relative">
                            <button
                              onClick={() => setUserMenuOpen(!userMenuOpen)}
                              className="flex items-center gap-2 text-[#252B42] hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
                            >
                              <img src={`https://www.gravatar.com/avatar/${md5((user.email||'').trim().toLowerCase())}?d=identicon&s=28`} alt="avatar" className="w-7 h-7 rounded-full"/>
                              <span className="text-sm font-bold">{user.name || user.email}</span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* User Dropdown Menu */}
                            {userMenuOpen && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setUserMenuOpen(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                  <div className="py-2">
                                    <Link
                                      to="/previous-orders"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                      onClick={() => setUserMenuOpen(false)}
                                    >
                                      My Orders
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                      onClick={handleLogout}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                    >
                                      Logout
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <span className="text-gray-400">/</span>
                            <Link to="/signup" className="hover:underline">Sign Up</Link>
                          </>
                        )}
                        <div className="relative">
                            {!searchOpen ? (
                                <button 
                                    aria-label="Search" 
                                    className="p-2 rounded hover:bg-gray-100"
                                    onClick={() => setSearchOpen(true)}
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            ) : (
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="px-3 py-1 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                                        onClick={() => setSearchOpen(false)}
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                aria-label="Cart"
                                className="flex items-center p-2 rounded hover:bg-gray-100 gap-1"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {totalCartItems > 0 && (
                                    <span className="text-[#23A6F0] text-xs font-bold">
                                        {totalCartItems}
                                    </span>
                                )}
                            </button>
                            <ShoppingCartDropdown
                                isOpen={cartOpen}
                                onClose={() => setCartOpen(false)}
                            />
                        </div>
                        <Link
                            to="/wishlist"
                            aria-label="Wishlist"
                            className="flex items-center p-2 rounded hover:bg-gray-100"
                        >
                            <Heart className="w-4 h-4" />
                            <span className="text-[11px] px-0.5 py-0.5">
                                1
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU - Outside fixed header to push content */}
                <div
                    data-mobile-menu
                    className={`md:hidden fixed top-[72px] left-0 w-full z-30 bg-white transition-all duration-300 overflow-hidden
                    ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                {/* menu links */}
                <nav className="flex flex-col gap-6 px-6 py-8 text-2xl text-gray-600 items-center text-center">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <Link to="/shop" className="font-medium hover:text-black">Shop</Link>
                    <Link to="/product" className="font-medium hover:text-black">Product</Link>
                    <Link to="/contact" className="font-medium hover:text-black">Contact</Link>
                    {user ? (
                        <button onClick={() => { dispatch(logout()); setOpen(false) }} className="font-medium hover:text-black">Logout</button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/signup" className="font-medium hover:text-black">Sign Up</Link>
                            <span className="text-gray-400">/</span>
                            <Link to="/login" className="font-medium hover:text-black">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}
