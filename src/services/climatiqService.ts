import axios from 'axios';

const CLIMATIQ_API_KEY = process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY;
const BASE_URL = 'https://api.climatiq.io/estimate';

interface EmissionRequestParams {
    activityId: string;
    passengers?: number;
    distance: number;
    distanceUnit: 'km' | 'mi';
}

export const calculateEmissions = async ({
                                             activityId,
                                             passengers = 1,
                                             distance,
                                             distanceUnit,
                                         }: EmissionRequestParams) => {
    try {
        const isBus = activityId.includes("bus");

        const response = await axios.post(
            BASE_URL,
            {
                emission_factor: {
                    activity_id: activityId,
                    source: isBus ? "UBA" : "ADEME",
                    region: isBus ? "DE" : "FR",
                    year: isBus ? 2020 : 2021,
                    source_lca_activity: isBus ? "upstream-fuel_combustion" : "fuel_upstream-fuel_combustion",
                    data_version: "^0",
                },
                parameters: {
                    passengers,
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
