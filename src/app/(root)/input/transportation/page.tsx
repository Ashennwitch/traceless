// src/app/input/transportation/page.tsx
'use client';

import React, { useState } from 'react';
import { calculateEmissions } from '@/services/climatiqService';

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
        <div>
            <h1>Transportation Emissions</h1>
            <label>
                Transportation Type:
                <select
                    value={transportType}
                    onChange={(e) => setTransportType(e.target.value)}
                >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                </select>
            </label>
            <label>
                Distance (km):
                <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                />
            </label>
            <label>
                Passengers:
                <input
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                />
            </label>
            <button onClick={handleCalculate}>Calculate Emissions</button>

            {emissionResult && <p>{emissionResult}</p>}
        </div>
    );
};

export default TransportationPage;
