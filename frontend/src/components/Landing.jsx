import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Hero from "./hero";
import Features from "./features";
import gsap from "gsap";

const Landing = () => {


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">


      {/* Page Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-indigo-600">StoreRatings</h1>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <Hero />

        {/* Features */}
        <Features />

        {/* CTA */}
        <div className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Rating?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join our community today and start sharing your experiences
            </p>
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
