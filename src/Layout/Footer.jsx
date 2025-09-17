import { Link } from "react-router-dom"

export default function Footer() {
    const footerSections = [
        {
            title: "Company Info",
            links: ["About Us", "Carrier", "We are hiring", "Blog"]
        },
        {
            title: "Legal",
            links: ["About Us", "Carrier", "We are hiring", "Blog"]
        },
        {
            title: "Features",
            links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"]
        },
        {
            title: "Resources",
            links: ["IOS & Android", "Watch a Demo", "Customers", "API"]
        }
    ]

    return (
        <footer className="bg-white border-t border-gray-200">
            {/* Top Section - Brand and Social Media */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center py-10 px-4">
                        {/* Brand */}
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Bandage
                            </h3>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-5">
                            {/* Facebook */}
                            <a href="#" className="text-[#23A6F0] hover:text-[#1d8bc4] transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            </a>

                            {/* Instagram */}
                            <a href="#" className="text-[#23A6F0] hover:text-[#1d8bc4] transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            </a>

                            {/* Twitter */}
                            <a href="#" className="text-[#23A6F0] hover:text-[#1d8bc4] transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-12 px-12">
                    <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-8 max-w-6xl mx-auto">
                        {/* Regular Footer Sections */}
                        {footerSections.map((section, index) => (
                            <div key={index} className="w-full md:flex-1 md:min-w-[140px] lg:w-[120px]">
                                <h4 className="text-sm font-bold text-gray-900 mb-4">
                                    {section.title}
                                </h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            {link === 'We are hiring' ? (
                                                <Link
                                                    to="/team"
                                                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-semibold"
                                                >
                                                    {link}
                                                </Link>
                                            ) : (
                                                <a
                                                    href="#"
                                                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors font-semibold"
                                                >
                                                    {link}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Get In Touch Section */}
                        <div className="w-full md:flex-1 md:min-w-[200px] lg:w-[200px]">
                            <h4 className="text-sm font-bold text-gray-900 mb-4">
                                Get In Touch
                            </h4>

                            {/* Email Subscription */}
                            <div className="flex flex-row mb-4 max-w-sm">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-1 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-xs !rounded-none"
                                />
                                <button className="px-2 py-2 bg-[#23A6F0] text-white font-semibold hover:bg-[#1d8bc4] transition-colors whitespace-nowrap text-xs !rounded-none">
                                    Subscribe
                                </button>
                            </div>

                            <p className="text-xs text-gray-500">
                                Lore imp sum dolor Amit
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="py-6 border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center md:text-left">
                        <p className="text-xs text-gray-500 font-semibold px-12">
                            Made With Love By Finland All Right Reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
