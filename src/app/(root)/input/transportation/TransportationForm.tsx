'use client';

import React, { useState } from 'react';
import { calculateEmissions } from './actions';

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

export function TransportationForm() {
    const [state, setState] = useState<FormState>({ message: '' });
    const [pending, setPending] = useState(false);

    const [transports, setTransports] = useState([
        { transportType: 'car', distance: 0 },
    ]);

    const addTransportRow = () => {
        setTransports([...transports, { transportType: 'car', distance: 0 }]);
    };

    const handleTransportChange = (index: number, field: string, value: string | number) => {
        const updatedTransports = [...transports];
        updatedTransports[index] = {
            ...updatedTransports[index],
            [field]: field === 'distance' ? Number(value) : value,
        };
        setTransports(updatedTransports);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);

        // Ensure all rows have valid data
        if (transports.some((transport) => transport.distance <= 0)) {
            setState({ message: 'Please enter valid distances for all rows.' });
            setPending(false);
            return;
        }

        const formData = new FormData();

        // Ensure consistent keys in FormData
        transports.forEach((transport) => {
            formData.append('transportType[]', transport.transportType);
            formData.append('distance[]', String(transport.distance));
        });

        try {
            const result = await calculateEmissions(state, formData);
            setState(result);
        } catch (error) {
            setState({ message: 'Failed to calculate emissions. Please try again.' });
        }

        setPending(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {transports.map((transport, index) => (
                <div key={index} className="transport-row flex gap-4 items-center border-b pb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Transportation Type:</label>
                        <select
                            name={`transportType[]`}
                            value={transport.transportType}
                            onChange={(e) => handleTransportChange(index, 'transportType', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="car">Car</option>
                            <option value="bus">Bus</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Distance (km):</label>
                        <input
                            type="number"
                            name={`distance[]`}
                            value={transport.distance}
                            onChange={(e) => handleTransportChange(index, 'distance', e.target.value)}
                            min="0"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addTransportRow}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
                Add Transport
            </button>

            <SubmitButton pending={pending} />

            {state.message && (
                <p className="mt-4 text-lg text-gray-800 font-semibold">{state.message}</p>
            )}
        </form>
    );
}
