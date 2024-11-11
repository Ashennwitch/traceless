// src/app/input/transportation/page.tsx
import { TransportationForm } from './TransportationForm';

export default function TransportationPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Transportation Emissions Calculator</h1>
                <TransportationForm />
            </div>
        </div>
    );
}