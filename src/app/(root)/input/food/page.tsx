// src/app/input/food/page.tsx
import { FoodForm } from './FoodForm';

export default function FoodPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Food Emissions Calculator</h1>
                <FoodForm />
            </div>
        </div>
    );
}