// src/app/input/transportation/page.tsx
'use client';

import React, { useState } from 'react';
import { calculateEmissions } from '@/services/climatiqService';
import 'tailwindcss/tailwind.css';

const TransportationPage: React.FC = () => {
    const [transportType, setTransportType] = useState<string>('car');
    const [distance, setDistance] = useState<number>(0);
    const [passengers, setPassengers] = useState<number>(1);
    const [emissionResult, setEmissionResult] = useState<string | null>(null);

    const handleCalculate = async () => {
        try {
            // Select the appropriate activityId based on transportType
            const activityId = transportType === 'car'
                ? 'passenger_vehicle-vehicle_type_car-fuel_source_E85-distance_na-engine_size_na'
                : 'passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na';

            const result = await calculateEmissions({
                activityId,
                passengers,
                distance,
                distanceUnit: 'km',
            });
            setEmissionResult(`Emissions: ${result.co2e} kg CO2e`);
        } catch (error) {
            setEmissionResult('Failed to calculate emissions');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Transportation Emissions Calculator</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Transportation Type:</label>
                    <select
                        value={transportType}
                        onChange={(e) => setTransportType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="car">Car</option>
                        <option value="bus">Bus</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Distance (km):</label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Passengers:</label>
                    <input
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
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

export default TransportationPage;
