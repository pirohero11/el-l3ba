"use client";

import { Label, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// 1. Minimum config required for the shadcn/ui container theme injection
const chartConfig = {
  progress: {
    label: "Progress",
    color: "#7209B7", // Bright purple color
  },
} satisfies ChartConfig;

interface PercentageChartProps {
  percentage: number; // Pass real dynamic percentages here (e.g., 65)
}

export default function CleanPercentageChart({ percentage }: PercentageChartProps) {
  // Normalize percentage data strictly for Recharts schema mapping
  const chartData = [{ name: "progress", value: percentage, fill: "#7209B7" }];

  return (
    <div className="h-[100px] w-[100px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            startAngle={90}    // Starts right at the top center vertical point
            endAngle={-270}   // Winds clockwise 360 degrees to finish back at top
            innerRadius="80%" // Adjust thickness of the progress ring track
            outerRadius="100%"
            barSize={14}      // Thickness of the actual colored line bar
          >
            {/* Background tracking track rail setup for the 0-100 scale layout */}
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            
            {/* Main filled progress color track layer */}
            <RadialBar
              dataKey="value"
              cornerRadius={12} // Smooth, rounded capsule endings for modern design
              background={{ fill: "hsl(var(--muted)/0.3)" }} // Minimal dim background track rail
            />

            {/* Seamless layout responsive absolute vector tracking labels layout */}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-[#7209B7] text-2xl font-bold tracking-tight"
                      >
                        {percentage}%
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
