import { useCallback, useState } from "react";

import {
  fetchPopulationData,
  type PopulationChartData,
} from "@/utils/fetcher/resas";

/**
 * Custom hook for population chart
 * @example
 * ```ts
 * const {
 *   getPopulationChartData,
 *   onCheckPref,
 *   onUncheckPref,
 * } = usePopulationChart();
 * ```
 */
function usePopulationChart() {
  const [populationChartData, setPopulationChartData] = useState<
    PopulationChartData[]
  >([]);

  const onCheckPref = useCallback(async (pref: PopulationChartData["pref"]) => {
    const data = await fetchPopulationData({ pref });
    if (!data) return;
    setPopulationChartData((prev) => [...prev, data]);
  }, []);

  const onUncheckPref = useCallback((pref: PopulationChartData["pref"]) => {
    setPopulationChartData((prev) =>
      prev.filter((data) => data.pref.prefCode !== pref.prefCode)
    );
  }, []);

  return {
    populationChartData,
    onCheckPref,
    onUncheckPref,
  };
}

export { usePopulationChart };
