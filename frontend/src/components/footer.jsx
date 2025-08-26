import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">StoreRatings</h3>
                    <p className="text-gray-400 mb-6">
                        The community-driven platform for honest store ratings and reviews
                    </p>
                    <div className="flex justify-center space-x-6">
                        <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                            Register
                        </Link>
                    </div>
                    <p className="text-gray-500 mt-8 text-sm">
                        © 2024 StoreRatings. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
