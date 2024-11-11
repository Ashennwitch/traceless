// src/app/input/food/actions.ts
'use server'

import { auth } from '@clerk/nextjs/server';
import { calculateFoodEmissions, saveEmissionResult } from '@/services/climatiqService';
import { revalidatePath } from 'next/cache';

interface FormState {
    message: string;
}

export async function calculateEmissions(prevState: FormState, formData: FormData): Promise<FormState> {
    const { userId } = await auth();

    if (!userId) {
        return { message: 'Please log in to calculate emissions' };
    }

    const foodType = formData.get('foodType') as string;
    const servings = Number(formData.get('servings'));
    const weight = servings * 75; // Each serving is 75g

    try {
        const activityId = foodType === 'fish'
            ? 'agriculture_fishing_forestry-type_fish_farmed-origin_region_global'
            : 'consumer_goods-type_meat_products_beef';

        const result = await calculateFoodEmissions({
            activityId,
            weight,
            weightUnit: 'g',
            distance: 0,
            distanceUnit: 'km',
        });

        await saveEmissionResult(userId, 'food', result.co2e);
        revalidatePath('/input/food');

        return { message: `Emissions: ${result.co2e} kg CO2e` };
    } catch (error) {
        return { message: 'Failed to calculate emissions' };
    }
}
