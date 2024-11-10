// src/app/input/food/page.tsx
'use client';

import React, { useState } from 'react';
import { calculateFoodEmissions } from '@/services/climatiqService';
import 'tailwindcss/tailwind.css';

const FoodPage: React.FC = () => {
    const [foodType, setFoodType] = useState<string>('fish');
    const [servings, setServings] = useState<number>(1);
    const [emissionResult, setEmissionResult] = useState<string | null>(null);

    const handleCalculate = async () => {
        try {
            const activityId = foodType === 'fish'
                ? 'agriculture_fishing_forestry-type_fish_farmed-origin_region_global'
                : 'consumer_goods-type_meat_products_beef';

            const result = await calculateFoodEmissions({
                activityId,
                weight: servings * 75, // Each serving is 75g
                weightUnit: 'g',
            });
            setEmissionResult(`Emissions: ${result.co2e} kg CO2e`);
        } catch (error) {
            setEmissionResult('Failed to calculate emissions');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Food Emissions Calculator</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Food Type:</label>
                    <select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="fish">Fish</option>
                        <option value="beef">Beef</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Number of Servings (75g each):</label>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Calculate Emissions
                </button>
                {emissionResult && (
                    <p className="mt-4 text-lg text-gray-800 font-semibold">{emissionResult}</p>
                )}
            </div>
        </div>
    );
};

export default FoodPage;
