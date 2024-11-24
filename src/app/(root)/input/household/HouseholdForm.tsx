'use client';

import React, { useState } from 'react';
import { calculateHouseholdEmissions } from './actions';

interface FormState {
    message: string;
}

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
            {pending ? 'Calculating...' : 'Calculate Emissions'}
        </button>
    );
}

export function HouseholdForm() {
    const [state, setState] = useState<FormState>({ message: '' });
    const [pending, setPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const result = await calculateHouseholdEmissions(state, formData);
        setState(result);

        setPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 mb-2">Microwave Uses:</label>
                <input
                    type="number"
                    name="microwaveUses"
                    min="0"
                    defaultValue={0}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">Washing Machine Cycles:</label>
                <input
                    type="number"
                    name="washingMachineCycles"
                    min="0"
                    defaultValue={0}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">Air Conditioning Usage (hours):</label>
                <input
                    type="number"
                    name="airConditioningHours"
                    min="0"
                    defaultValue={0}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">Light Bulb Usage (hours):</label>
                <input
                    type="number"
                    name="lightBulbHours"
                    min="0"
                    defaultValue={0}
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <SubmitButton pending={pending} />

            {state.message && (
                <p className="mt-4 text-lg text-gray-800 font-semibold">{state.message}</p>
            )}
        </form>
    );
}
