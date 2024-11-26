"use client";

import React from "react";

interface GamificationProps {
    totalData: {
        food: number;
        transport: number;
        household: number;
    };
    previousData: {
        food: number;
        transport: number;
        household: number;
    };
}

// Badges based on reduction achievements
const BADGES = {
    food: { name: "Eco-Friendly Eater", description: "Reduced food emissions significantly" },
    transport: { name: "Green Commuter", description: "Reduced transport emissions significantly" },
    household: { name: "Energy Saver", description: "Reduced household emissions significantly" },
};

const Gamification: React.FC<GamificationProps> = ({ totalData, previousData }) => {
    const { food, transport, household } = totalData;

    const reductions = {
        food: previousData.food - food,
        transport: previousData.transport - transport,
        household: previousData.household - household,
    };

    const earnedBadges = [];

    if (reductions.food > 5) {
        earnedBadges.push(BADGES.food);
    }
    if (reductions.transport > 5) {
        earnedBadges.push(BADGES.transport);
    }
    if (reductions.household > 5) {
        earnedBadges.push(BADGES.household);
    }

    // Calculate total reduction progress
    const totalReduction = Math.max(0, reductions.food + reductions.transport + reductions.household);
    const progressPercentage = Math.min(100, (totalReduction / 30) * 100); // Example goal: 30kg reduction

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Gamification: Your Achievements</h3>
            <p className="mb-4 text-gray-600">Track your progress and earn badges for sustainable actions!</p>

            <div className="mb-6">
                <h4 className="text-md font-semibold">Progress Toward Monthly Goal</h4>
                <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className="mt-2 text-gray-700">{`You have achieved ${progressPercentage.toFixed(
                    1
                )}% of your monthly reduction goal.`}</p>
            </div>

            <div>
                <h4 className="text-md font-semibold">Earned Badges</h4>
                {earnedBadges.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {earnedBadges.map((badge, index) => (
                            <li key={index} className="p-4 border rounded-lg shadow-sm">
                                <h5 className="text-lg font-semibold">{badge.name}</h5>
                                <p className="text-gray-600">{badge.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-gray-600">No badges earned yet. Keep working toward your goals!</p>
                )}
            </div>
        </div>
    );
};

export default Gamification;
