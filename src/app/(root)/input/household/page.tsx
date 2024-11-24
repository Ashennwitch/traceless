// src/app/input/household/page.tsx
import { HouseholdForm } from './HouseholdForm';

export default function HouseholdPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Household Emissions Calculator
                </h1>
                <HouseholdForm />
            </div>
        </div>
    );
}
