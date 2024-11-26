import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/services/db";
import { carbonResults } from "@/db/schema";

interface CarbonResult {
    type: "food" | "transportation" | "household";
    result: number;
    createdAt: Date;
}

interface AggregatedData {
    [key: string]: {
        date: string;
        food: number;
        transport: number;
        household: number;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch data and assert the type
        const results = (await db.select().from(carbonResults)).map((entry) => ({
            ...entry,
            type: entry.type as CarbonResult["type"], // Type assertion for `type`
        })) as CarbonResult[];

        // Aggregate the data by date (use full date, not just month-year)
        const aggregatedData: AggregatedData = results.reduce((acc, entry) => {
            const date = new Date(entry.createdAt);
            const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

            if (!acc[formattedDate]) {
                acc[formattedDate] = { date: formattedDate, food: 0, transport: 0, household: 0 };
            }

            if (entry.type === "food") acc[formattedDate].food += entry.result;
            if (entry.type === "transportation") acc[formattedDate].transport += entry.result;
            if (entry.type === "household") acc[formattedDate].household += entry.result;

            return acc;
        }, {} as AggregatedData);

        // Convert aggregated object to an array and sort by date
        const formattedData = Object.values(aggregatedData).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Respond with the aggregated data
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error fetching carbon footprint history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
