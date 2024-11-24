// src/services/climatiqService.ts

import axios from 'axios';
import { db } from '../index'; // Adjust if db import path differs
import { carbonResults } from '../db/schema';
import { eq } from 'drizzle-orm';

const CLIMATIQ_API_KEY = process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY;
const BASE_URL = 'https://api.climatiq.io/estimate';

interface EmissionRequestParams {
    activityId: string;
    passengers?: number;
    distance: number;
    weight: number;
    distanceUnit: 'km' | 'mi';
    weightUnit: 'g';
}

export const calculateTransportationEmissions = async ({
                                                           activityId,
                                                           distance,
                                                           distanceUnit,
                                                       }: {
    activityId: string;
    distance: number;
    distanceUnit: 'km' | 'mi';
}) => {
    try {
        // Determine default passengers based on activityId
        const passengers = activityId.includes('bus') ? 30 : 4;

        const isBus = activityId.includes('bus');

        const response = await axios.post(
            BASE_URL,
            {
                emission_factor: {
                    activity_id: activityId,
                    source: isBus ? 'UBA' : 'ADEME',
                    region: isBus ? 'DE' : 'FR',
                    year: isBus ? 2020 : 2021,
                    source_lca_activity: isBus ? 'upstream-fuel_combustion' : 'fuel_upstream-fuel_combustion',
                    data_version: '^0',
                },
                parameters: {
                    passengers, // Static passengers for car/bus
                    distance,
                    distance_unit: distanceUnit,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error calculating emissions:', error);
        throw error;
    }
};




export const calculateFoodEmissions = async ({
                                                 activityId,
                                                 weight,
                                                 weightUnit,
                                             }: EmissionRequestParams) => {
    try {
        const response = await axios.post(
            BASE_URL,
            {
                emission_factor: {
                    activity_id: activityId,
                    data_version: "^0",
                },
                parameters: {
                    weight,
                    weight_unit: weightUnit,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error calculating food emissions:', error);
        throw error;
    }
};

export const saveEmissionResult = async (userId: string, type: string, result: number) => {
    try {
        await db.insert(carbonResults).values({
            userId,
            type,
            result,
        });
    } catch (error) {
        console.error('Error saving emission result:', error);
        throw error;
    }
};