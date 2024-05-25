"use client";

import { LineChart } from "@mui/x-charts/LineChart";

type ChartProps = {
  title?: string;
  xAxis?: React.ComponentProps<typeof LineChart>["xAxis"];
  yAxis?: React.ComponentProps<typeof LineChart>["yAxis"];
  series: React.ComponentProps<typeof LineChart>["series"];
  height?: React.ComponentProps<typeof LineChart>["height"];
  margin?: React.ComponentProps<typeof LineChart>["margin"];
};

export function Chart({
  title,
  xAxis,
  yAxis,
  series,
  height,
  margin,
}: ChartProps) {
  return (
    <LineChart
      title={title}
      xAxis={xAxis}
      yAxis={yAxis}
      series={series}
      height={height}
      margin={margin}
      grid={{ vertical: true, horizontal: true }}
      slotProps={{
        legend: {
          itemMarkWidth: 16,
          itemMarkHeight: 16,
          itemGap: 8,
        },
      }}
      sx={{
        "& .css-1f57y8b": {
          fill: "currentColor",
        },
        "& .MuiChartsGrid-line": {
          stroke: "currentColor",
          strokeOpacity: 0.2,
        },
        "& .MuiChartsAxis-line": {
          stroke: "currentColor",
          strokeOpacity: 0.2,
        },
        "& .MuiChartsAxis-tick": {
          stroke: "currentColor",
          strokeOpacity: 0.2,
        },
        "& .MuiChartsAxis-label tspan": {
          fill: "currentColor",
          fontSize: "0.75rem", // text-xs
        },
        "& .MuiChartsAxis-tickLabel tspan": {
          fill: "currentColor",
        },
        "& .MuiChartsLegend-series tspan": {
          fill: "currentColor",
          fontSize: "0.875rem", // text-sm
        },
        "& .MuiChartsLegend-mark": {
          rx: 9999,
        },
      }}
    />
  );
}
