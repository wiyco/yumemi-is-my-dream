"use client";

import { LineChart } from "@mui/x-charts/LineChart";

type ChartProps = {
  title?: string;
  xAxis?: React.ComponentProps<typeof LineChart>["xAxis"];
  yAxis?: React.ComponentProps<typeof LineChart>["yAxis"];
  series: React.ComponentProps<typeof LineChart>["series"];
};

export function Chart({ title, xAxis, yAxis, series }: ChartProps) {
  return (
    <LineChart
      title={title}
      xAxis={xAxis}
      yAxis={yAxis}
      series={series}
      height={360}
      margin={{ left: 66, right: 32, top: 48, bottom: 32 }}
      grid={{ vertical: true, horizontal: true }}
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
        "& .MuiChartsAxis-tickLabel tspan": {
          fill: "currentColor",
        },
        "& .MuiChartsLegend-series tspan": {
          fill: "currentColor",
        },
      }}
    />
  );
}
