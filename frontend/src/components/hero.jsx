import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Rate Your Favorite
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            {' '}Stores
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Join thousands of users who share their experiences and help others discover the best stores in their area.
                        Rate stores from 1 to 5 stars and contribute to a community-driven platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Start Rating Today
                        </Link>
                        <Link
                            to="/login"
                            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
