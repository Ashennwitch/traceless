import React from 'react';

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
        <section className="py-16 bg-gray-50">
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


        {/* Call-to-Action Section */}
        <section className="py-12 bg-green-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Start Your Sustainable Journey Today</h2>
            <button className="bg-white text-green-600 px-6 py-3 font-semibold rounded shadow hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-gray-800 text-gray-300">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Traceless. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
  );
}
