'use server'

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

    const transportType = formData.get('transportType') as string;
    const distance = Number(formData.get('distance'));
    const passengers = Number(formData.get('passengers'));

    try {
        const activityId = transportType === 'car'
            ? 'passenger_vehicle-vehicle_type_car-fuel_source_E85-distance_na-engine_size_na'
            : 'passenger_vehicle-vehicle_type_bus-fuel_source_na-distance_na-engine_size_na';

        const result = await calculateTransportationEmissions({
            activityId,
            passengers,
            distance,
            distanceUnit: 'km',
            weight: 0,
            weightUnit: 'g',
        });

        await saveEmissionResult(userId, 'transportation', result.co2e);
        revalidatePath('/input/transportation');

        return { message: `Emissions: ${result.co2e} kg CO2e` };
    } catch (error) {
        return { message: 'Failed to calculate emissions' };
    }
}