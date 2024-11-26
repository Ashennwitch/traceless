"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, PieChart, Pie } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PersonalizedSuggestions from "./suggestions/PersonalizedSuggestions";
import BenchmarkingSuggestions from "./suggestions/BenchmarkingSuggestions";
import Gamification from "./suggestions/Gamification";

interface ChartData {
    date: string;
    food: number;
    transport: number;
    household: number;
}

interface AggregatedData {
    date: string;
    food: number;
    transport: number;
    household: number;
}

// Chart configurations
const chartConfig = {
    food: { label: "Food", color: "hsl(var(--chart-1))" },
    transport: { label: "Transport", color: "hsl(var(--chart-2))" },
    household: { label: "Household", color: "hsl(var(--chart-3))" },
};

// Mock data generators
const mockData6Months = Array.from({ length: 180 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
        date: date.toISOString().split("T")[0],
        food: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        transport: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        household: parseFloat((Math.random() * 2 + 1).toFixed(1)),
    };
});

const mockDataMonth = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
        date: date.toISOString().split("T")[0],
        food: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        transport: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        household: parseFloat((Math.random() * 2 + 1).toFixed(1)),
    };
});

const mockDataWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
        date: date.toISOString().split("T")[0],
        food: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        transport: parseFloat((Math.random() * 2 + 1).toFixed(1)),
        household: parseFloat((Math.random() * 2 + 1).toFixed(1)),
    };
});

export default function DashboardPage() {
    const [timeRange, setTimeRange] = useState("6 months");
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const [previousData, setPreviousData] = useState({
        food: 0,
        transport: 0,
        household: 0,
    }); // Mock for previous emissions

    useEffect(() => {
        // Uncomment this block to fetch real data from the API

        async function fetchData() {
            try {
                const response = await fetch("/api/carbon-footprint-history");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setChartData(data);

                // Fetch previous data for comparison
                const previousResponse = await fetch("/api/carbon-footprint-history/previous");
                const previous = await previousResponse.json();
                setPreviousData(previous);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();


        // Uncomment this block to use mock data
        /*
        if (timeRange === "6 months") {
            setChartData(mockData6Months);
        } else if (timeRange === "1 month") {
            setChartData(mockDataMonth);
        } else if (timeRange === "1 week") {
            setChartData(mockDataWeek);
        }
        setPreviousData({ food: 60, transport: 80, household: 70 }); // Mock previous data
        */
    }, [timeRange]);

    const aggregatedData = useMemo(() => {
        if (timeRange === "6 months") {
            return aggregateByMonth(chartData);
        } else if (timeRange === "1 month") {
            return aggregateByWeek(chartData);
        } else {
            return chartData; // Daily data for 1 week
        }
    }, [chartData, timeRange]);

    const totalAggregatedData = aggregatedData.reduce<AggregatedData>(
        (acc, entry) => {
            acc.food += entry.food;
            acc.transport += entry.transport;
            acc.household += entry.household;
            return acc;
        },
        { date: "", food: 0, transport: 0, household: 0 }
    );

    return (
        <div className="container mx-auto py-12">
            <div className="mb-4">
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="6 months">Past 6 Months</option>
                    <option value="1 month">Past Month</option>
                    <option value="1 week">Past Week</option>
                </select>
            </div>

            {/* Area Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Carbon Footprint Over Time</CardTitle>
                    <CardDescription>
                        Visualizing your historical emissions by category.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            data={aggregatedData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis tickFormatter={(value) => `${value} kg`} />
                            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Area dataKey="food" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                            <Area dataKey="transport" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                            <Area dataKey="household" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Pie Chart */}
            <PieChartCard data={aggregatedData} />

            {/* Personalized Suggestions */}
            <PersonalizedSuggestions aggregatedData={totalAggregatedData} />

            {/* Benchmarking Suggestions */}
            <BenchmarkingSuggestions totalData={totalAggregatedData} />

            {/* Gamification */}
            <Gamification totalData={totalAggregatedData} previousData={previousData} />
        </div>
    );
}

// Aggregate data by month
function aggregateByMonth(data: ChartData[]): AggregatedData[] {
    const result: Record<string, AggregatedData> = {};

    data.forEach((entry) => {
        const month = entry.date.slice(0, 7); // YYYY-MM
        if (!result[month]) {
            result[month] = { date: month, food: 0, transport: 0, household: 0 };
        }
        result[month].food += entry.food;
        result[month].transport += entry.transport;
        result[month].household += entry.household;
    });

    return Object.values(result);
}

// Aggregate data by week
function aggregateByWeek(data: ChartData[]): AggregatedData[] {
    const result: Record<string, AggregatedData> = {};
    const weekFormatter = (date: Date) => {
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - date.getDay()); // Set to Sunday
        return firstDayOfWeek.toISOString().slice(0, 10); // YYYY-MM-DD
    };

    data.forEach((entry) => {
        const week = weekFormatter(new Date(entry.date));
        if (!result[week]) {
            result[week] = { date: `Week of ${week}`, food: 0, transport: 0, household: 0 };
        }
        result[week].food += entry.food;
        result[week].transport += entry.transport;
        result[week].household += entry.household;
    });

    return Object.values(result);
}

// Pie Chart Component
const PieChartCard = ({ data }: { data: AggregatedData[] }) => {
    const aggregatedData = data.reduce<AggregatedData>(
        (acc, entry) => {
            acc.food += entry.food || 0;
            acc.transport += entry.transport || 0;
            acc.household += entry.household || 0;
            return acc;
        },
        { date: "", food: 0, transport: 0, household: 0 }
    );

    const pieData = [
        { name: "Food", value: aggregatedData.food, fill: "hsl(var(--chart-1))" },
        { name: "Transport", value: aggregatedData.transport, fill: "hsl(var(--chart-2))" },
        { name: "Household", value: aggregatedData.household, fill: "hsl(var(--chart-3))" },
    ];

    const isDataEmpty = pieData.every((entry) => entry.value === 0);

    return (
        <Card className="flex flex-col mt-8">
            <CardHeader className="items-center pb-0">
                <CardTitle>Carbon Footprint by Category</CardTitle>
                <CardDescription>Category breakdown for the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {isDataEmpty ? (
                    <div className="text-center text-muted-foreground">
                        No data available for the selected period.
                    </div>
                ) : (
                    <PieChart width={400} height={400} style={{ overflow: "visible" }}>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={80}
                            outerRadius={120}
                            strokeWidth={2}
                            paddingAngle={5}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill="black"
                                        textAnchor={x > cx ? "start" : "end"}
                                        dominantBaseline="central"
                                        fontSize="12px"
                                    >
                                        {`${name}: ${(percent * 100).toFixed(1)}%`}
                                    </text>
                                );
                            }}
                            labelLine={false}
                        />
                    </PieChart>
                )}
            </CardContent>
        </Card>
    );
};
