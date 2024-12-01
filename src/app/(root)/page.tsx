// src/app/(root)/page.tsx

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <header className="bg-green-600 text-white py-10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Welcome to Traceless</h1>
            <p className="mt-4 text-lg">Your guide to reducing carbon emissions and living sustainably.</p>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Traceless?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Calculate Carbon Emissions</h3>
                <p className="text-gray-700">Analyze and understand the carbon footprint of your daily activities like
                  transportation and energy usage.</p>
              </div>
              {/* Feature 2 */}
              <div className="text-center p-6 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Feedback & Recommendations</h3>
                <p className="text-gray-700">Receive tailored advice to minimize your emissions and adopt more
                  eco-friendly habits.</p>
              </div>
              {/* Feature 3 */}
              <div className="text-center p-6 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Visualize Your Impact</h3>
                <p className="text-gray-700">Interactive pie charts to help you understand your carbon contributions at
                  a glance.</p>
              </div>
              {/* Feature 4 */}
              <div className="text-center p-6 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Earn Badges & Rewards</h3>
                <p className="text-gray-700">Stay motivated and committed by earning badges and rewards as you progress
                  toward sustainability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About Traceless</h2>
            <p className="text-lg text-gray-700 mb-8">
              Traceless is a platform dedicated to helping individuals and businesses reduce their carbon footprint. Our goal is to raise awareness about sustainability by providing tools that track, analyze, and minimize carbon emissions.
              Whether you're just starting your sustainability journey or looking for ways to further reduce your impact, Traceless is here to guide you every step of the way.
            </p>
            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-6 py-3 font-semibold rounded shadow hover:bg-green-500 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              Have questions or need assistance? We're here to help! Get in touch with us using the contact details below.
            </p>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Email:</strong> <a href="mailto:hanifnurjaya24@gmail.com" className="text-green-600 hover:text-green-500">hanifnurjaya24@gmail.com</a>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Phone:</strong> <span className="text-green-600">+62 812 3456 7890</span>
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our team is always available to assist you with any inquiries or support needs.
              </p>
              <div className="flex justify-center">
                <button className="bg-green-600 text-white px-6 py-3 font-semibold rounded shadow hover:bg-green-500 transition">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-12 bg-green-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Start Your Sustainable Journey Today</h2>
            <Link href="/input">
              <button className="bg-white text-green-600 px-6 py-3 font-semibold rounded shadow hover:bg-gray-200">
                Get Started
              </button>
            </Link>
          </div>
        </section>
      </div>
  );
}
