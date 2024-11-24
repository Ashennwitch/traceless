"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    food: {
        label: "Food",
        color: "hsl(var(--chart-1))",
    },
    transport: {
        label: "Transport",
        color: "hsl(var(--chart-2))",
    },
    household: {
        label: "Household",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export default function DashboardPage() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/carbon-footprint-history");
            const data = await response.json();
            setChartData(data);
        }

        fetchData();
    }, []);

    /**
     useEffect(() => {
     const mockData = [
     { date: "2024-01", food: 5.3, transport: 10.1, household: 7.2 },
     { date: "2024-02", food: 4.5, transport: 12.0, household: 8.0 },
     { date: "2024-03", food: 6.1, transport: 15.0, household: 9.0 },
     { date: "2024-04", food: 7.0, transport: 10.0, household: 6.0 },
     ];
     setChartData(mockData);
     }, []);
     * */

    return (
        <div className="container mx-auto py-12">
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
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleString("default", {
                                        month: "short",
                                        year: "numeric",
                                    })
                                }
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `${value} kg`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                type="natural"
                                dataKey="food"
                                stackId="1"
                                stroke="var(--color-food)"
                                fill="var(--color-food)"
                                fillOpacity={0.4}
                            />
                            <Area
                                type="natural"
                                dataKey="transport"
                                stackId="1"
                                stroke="var(--color-transport)"
                                fill="var(--color-transport)"
                                fillOpacity={0.4}
                            />
                            <Area
                                type="natural"
                                dataKey="household"
                                stackId="1"
                                stroke="var(--color-household)"
                                fill="var(--color-household)"
                                fillOpacity={0.4}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                Historical carbon footprint by category.
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
