// src/app/input/food/actions.ts
'use server';

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

    const foodTypes = formData.getAll('foodType[]') as string[];
    const servingsList = formData.getAll('servings[]') as string[];

    if (foodTypes.length !== servingsList.length) {
        return { message: 'Invalid input: mismatched entries' };
    }

    try {
        let totalEmissions = 0;

        for (let i = 0; i < foodTypes.length; i++) {
            const foodType = foodTypes[i];
            const servings = Number(servingsList[i]);
            const weight = servings * 75; // Each serving is 75g

            const activityId =
                foodType === 'fish'
                    ? 'agriculture_fishing_forestry-type_fish_farmed-origin_region_global'
                    : 'consumer_goods-type_meat_products_beef';

            const result = await calculateFoodEmissions({
                activityId,
                weight,
                weightUnit: 'g',
                distance: 0,
                distanceUnit: 'km',
            });

            totalEmissions += result.co2e;
        }

        await saveEmissionResult(userId, 'food', totalEmissions);
        revalidatePath('/input/food');

        return { message: `Total Emissions: ${totalEmissions.toFixed(2)} kg CO2e` };
    } catch (error) {
        return { message: 'Failed to calculate emissions' };
    }
}
