// src/app/input/household/actions.ts
'use server';

import { auth } from '@clerk/nextjs/server';
import { saveEmissionResult } from '@/services/climatiqService';
import { revalidatePath } from 'next/cache';

interface FormState {
    message: string;
}

// Emission data for each appliance
const emissionFactors = {
    microwave: { co2PerUse: 400 }, // grams of CO2 per use
    washingMachine: { co2PerUse: 275 }, // grams of CO2 per cycle
    airConditioning: { co2PerHour: 2000 }, // grams of CO2 per hour
    lightBulb: { co2Per4Hours: 172 }, // grams of CO2 per 4 hours
};

export async function calculateHouseholdEmissions(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const { userId } = await auth();

    if (!userId) {
        return { message: 'Please log in to calculate emissions' };
    }

    // Get user inputs
    const microwaveUses = Number(formData.get('microwaveUses') || 0);
    const washingMachineCycles = Number(formData.get('washingMachineCycles') || 0);
    const airConditioningHours = Number(formData.get('airConditioningHours') || 0);
    const lightBulbHours = Number(formData.get('lightBulbHours') || 0);

    try {
        // Calculate emissions
        const microwaveEmissions = microwaveUses * emissionFactors.microwave.co2PerUse;
        const washingMachineEmissions =
            washingMachineCycles * emissionFactors.washingMachine.co2PerUse;
        const airConditioningEmissions =
            airConditioningHours * emissionFactors.airConditioning.co2PerHour;
        const lightBulbEmissions =
            (lightBulbHours / 4) * emissionFactors.lightBulb.co2Per4Hours;

        const totalEmissions =
            microwaveEmissions +
            washingMachineEmissions +
            airConditioningEmissions +
            lightBulbEmissions;

        // Save result to database
        await saveEmissionResult(userId, 'household', totalEmissions / 1000); // Convert grams to kilograms

        revalidatePath('/input/household');

        return {
            message: `Total Household Emissions: ${(totalEmissions / 1000).toFixed(2)} kg CO2e`,
        };
    } catch (error) {
        console.error('Error calculating emissions:', error);
        return { message: 'Failed to calculate emissions' };
    }
}
