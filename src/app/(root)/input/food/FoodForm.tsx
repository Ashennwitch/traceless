// src/app/input/food/FoodForm.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { calculateEmissions } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();

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

export function FoodForm() {
    const initialState = { message: '' };
    const [state, formAction] = useFormState(calculateEmissions, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Food Type:</label>
                <select
                    name="foodType"
                    defaultValue="fish"
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
                    name="servings"
                    defaultValue={1}
                    min="1"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <SubmitButton />
            {state?.message && (
                <p className="mt-4 text-lg text-gray-800 font-semibold">{state.message}</p>
            )}
        </form>
    );
}