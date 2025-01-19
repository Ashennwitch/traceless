// src/app/(root)/input/food/FoodForm.tsx

'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { calculateEmissions } from './actions';

interface FormState {
    message: string;
}

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
    const [foods, setFoods] = useState([{ foodType: 'fish', servings: 1 }]);

    const [state, setState] = useState<FormState>({ message: '' });

    const addFoodRow = () => {
        setFoods([...foods, { foodType: 'fish', servings: 1 }]);
    };

    const handleFoodChange = (index: number, field: string, value: string | number) => {
        const updatedFoods = [...foods];
        updatedFoods[index] = {
            ...updatedFoods[index],
            [field]: field === 'servings' ? Number(value) : value,
        };
        setFoods(updatedFoods);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Populate the FormData manually to include all rows
        const formData = new FormData();
        foods.forEach((food) => {
            formData.append('foodType[]', food.foodType);
            formData.append('servings[]', String(food.servings));
        });

        const result = await calculateEmissions(state, formData);
        setState(result);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {foods.map((food, index) => (
                <div key={index} className="food-row flex gap-4 items-center border-b pb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Food Type:</label>
                        <select
                            name="foodType[]"
                            value={food.foodType}
                            onChange={(e) => handleFoodChange(index, 'foodType', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="fish">Fish</option>
                            <option value="beef">Beef</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Number of Servings (75g each):</label>
                        <input
                            type="number"
                            name="servings[]"
                            value={food.servings}
                            onChange={(e) => handleFoodChange(index, 'servings', e.target.value)}
                            min="1"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addFoodRow}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
                Add Food
            </button>

            <SubmitButton />

            {state.message && (
                <p className="mt-4 text-lg text-gray-800 font-semibold">{state.message}</p>
            )}
        </form>
    );
}
