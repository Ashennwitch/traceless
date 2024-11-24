'use server';

import { auth } from '@clerk/nextjs/server';
import { calculateTransportationEmissions, saveEmissionResult } from '@/services/climatiqService';
import { revalidatePath } from 'next/cache';

interface FormState {
    message: string;
}

export async function calculateEmissions(prevState: FormState, formData: FormData): Promise<FormState> {
    const { userId } = await auth();

    if (!userId) {
        return { message: 'Please log in to calculate emissions' };
    }

    const transportTypes = formData.getAll('transportType[]') as string[];
    const distances = formData.getAll('distance[]') as string[];

    if (transportTypes.length !== distances.length) {
        return { message: 'Invalid input: mismatched entries' };
    }

    try {
        let totalEmissions = 0;

        for (let i = 0; i < transportTypes.length; i++) {
            const transportType = transportTypes[i];
            const distance = Number(distances[i]);

            const activityId =
                transportType === 'car'
                    ? 'passenger_vehicle-vehicle_type_car-fuel_source_E85-distance_na-engine_size_na'
                    : 'passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na';

            const result = await calculateTransportationEmissions({
                activityId,
                distance,
                distanceUnit: 'km',
            });

            totalEmissions += result.co2e;
        }

        await saveEmissionResult(userId, 'transportation', totalEmissions);
        revalidatePath('/input/transportation');

        return { message: `Total Emissions: ${totalEmissions.toFixed(2)} kg CO2e` };
    } catch (error) {
        console.error('Error calculating emissions:', error);
        return { message: 'Failed to calculate emissions' };
    }
}
