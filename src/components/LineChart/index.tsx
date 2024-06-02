import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { isDarkTheme } from "@/utils/theme";

/** @see {@link https://react-chartjs-2.js.org/examples/line-chart} */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

type LineChartProps = React.ComponentProps<typeof Line>;

export function LineChart(props: LineChartProps) {
  return (
    <Line
      {...props}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 64,
          },
        },
        plugins: {
          colors: {
            forceOverride: true,
          },
          legend: {
            labels: {
              color: isDarkTheme() ? "#e5e5e5" : "#262626",
            },
          },
          title: props.title
            ? {
                display: true,
                text: props.title,
                color: isDarkTheme() ? "#e5e5e5" : "#262626",
                font: {
                  size: 16,
                },
              }
            : undefined,
        },
        scales: {
          x: {
            grid: {
              color: "rgba(115, 115, 115, 0.5)",
            },
            ticks: {
              color: isDarkTheme() ? "#e5e5e5" : "#262626",
            },
          },
          y: {
            grid: {
              color: "rgba(115, 115, 115, 0.5)",
            },
            ticks: {
              color: isDarkTheme() ? "#e5e5e5" : "#262626",
            },
          },
        },
      }}
    />
  );
}
