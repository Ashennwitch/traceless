// src/app/(root)/input/page.tsx

import React from 'react';
import Link from 'next/link';

export default function InputPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="bg-green-600 text-white py-10">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Input Your Carbon Footprint</h1>
                    <p className="mt-4 text-lg">
                        Choose a category below to calculate your emissions and take the first step toward a sustainable future.
                    </p>
                </div>
            </header>

            {/* Input Options Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        Select an Activity
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Transportation */}
                        <Link href="/input/transportation">
                            <div className="text-center p-6 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">Transportation</h3>
                                <p className="text-gray-700">
                                    Calculate your carbon footprint from daily commutes, long-distance travel, and more.
                                </p>
                            </div>
                        </Link>
                        {/* Food */}
                        <Link href="/input/food">
                            <div className="text-center p-6 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">Food</h3>
                                <p className="text-gray-700">
                                    Understand the impact of your dietary choices on the environment.
                                </p>
                            </div>
                        </Link>
                        {/* Household */}
                        <Link href="/input/household">
                            <div className="text-center p-6 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition">
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">Household</h3>
                                <p className="text-gray-700">
                                    Measure emissions from appliances and energy usage in your home.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Navigate to Dashboard */}
            <section className="py-12 bg-green-600 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">See Your Dashboard</h2>
                    <Link href="/dashboard">
                        <button className="bg-white text-green-600 px-6 py-3 font-semibold rounded shadow hover:bg-gray-200">
                            Go to Dashboard
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
