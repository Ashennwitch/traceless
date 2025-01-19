// src/app/(root)/dashboard/suggestions/PersonalizedSuggestions.tsx

"use client";

import React from "react";

interface AggregatedData {
    food: number;
    transport: number;
    household: number;
}

interface PersonalizedSuggestionsProps {
    aggregatedData: AggregatedData;
}

const PersonalizedSuggestions: React.FC<PersonalizedSuggestionsProps> = ({ aggregatedData }) => {
    const { food, transport, household } = aggregatedData;

    // Determine the highest category to provide targeted advice
    const suggestions = [];

    if (food > transport && food > household) {
        suggestions.push(
            "Consider incorporating more plant-based meals into your diet. Reducing meat consumption is one of the most effective ways to lower your food-related emissions."
        );
    } else if (transport > food && transport > household) {
        suggestions.push(
            "Transportation is your largest source of emissions. Try carpooling, using public transportation, or biking to lower your transport-related footprint."
        );
    } else if (household > food && household > transport) {
        suggestions.push(
            "Your household energy use contributes the most to your carbon footprint. Consider switching to energy-efficient appliances or reducing heating and cooling usage."
        );
    }

    // General suggestions
    if (food > 50) {
        suggestions.push("Avoid food waste by planning meals ahead and storing leftovers properly.");
    }
    if (transport > 50) {
        suggestions.push("Opt for walking or biking for short distances to reduce transport emissions.");
    }
    if (household > 50) {
        suggestions.push("Switch off appliances and lights when not in use to save energy.");
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Personalized Suggestions</h3>
            {suggestions.length > 0 ? (
                <ul className="list-disc list-inside">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="mb-2 text-gray-700">
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-700">You're doing great! Keep up the good work to maintain a sustainable lifestyle.</p>
            )}
        </div>
    );
};

export default PersonalizedSuggestions;
