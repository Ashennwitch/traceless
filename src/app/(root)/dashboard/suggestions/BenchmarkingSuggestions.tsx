// src/app/(root)/dashboard/suggestions/BenchmarkingSuggestions.tsx

"use client";

import React from "react";

interface BenchmarkingSuggestionsProps {
    totalData: {
        food: number;
        transport: number;
        household: number;
    };
}

// Define benchmark values (e.g., national averages or sustainable goals)
const BENCHMARKS = {
    food: 50, // Example: 50 kg CO2/month
    transport: 70, // Example: 70 kg CO2/month
    household: 60, // Example: 60 kg CO2/month
};

const BenchmarkingSuggestions: React.FC<BenchmarkingSuggestionsProps> = ({ totalData }) => {
    const { food, transport, household } = totalData;

    // Compare the user's data with benchmarks and create feedback
    const feedback = [];

    if (food > BENCHMARKS.food) {
        feedback.push(
            `Your food-related emissions are higher than the benchmark (${BENCHMARKS.food} kg/month). Consider incorporating more plant-based meals or reducing food waste.`
        );
    } else {
        feedback.push("Great job! Your food-related emissions are below the benchmark.");
    }

    if (transport > BENCHMARKS.transport) {
        feedback.push(
            `Your transport-related emissions are above the benchmark (${BENCHMARKS.transport} kg/month). Try carpooling, using public transport, or switching to a more sustainable vehicle.`
        );
    } else {
        feedback.push("Awesome! Your transport-related emissions are below the benchmark.");
    }

    if (household > BENCHMARKS.household) {
        feedback.push(
            `Your household energy emissions exceed the benchmark (${BENCHMARKS.household} kg/month). Consider energy-efficient appliances or reducing energy usage.`
        );
    } else {
        feedback.push("Fantastic! Your household energy emissions are within sustainable levels.");
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Benchmarking Suggestions</h3>
            <p className="mb-4 text-gray-600">
                See how your carbon footprint compares to sustainable benchmarks.
            </p>
            <ul className="list-disc list-inside">
                {feedback.map((item, index) => (
                    <li key={index} className="mb-2 text-gray-700">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BenchmarkingSuggestions;
