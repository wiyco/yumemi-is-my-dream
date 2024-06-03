import type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPrefecturesResponse,
} from "@/types/resas";

type PopulationChartData = {
  pref: ReasasPrefecturesResponse["result"][0];
  populations: ReasasPopulationCompositionPerYearResponse["result"]["data"];
};

async function getPopulationChartData({
  pref,
}: {
  pref: PopulationChartData["pref"];
}): Promise<PopulationChartData | null> {
  const res = (await fetch(
    `/api/v1/population/composition/years?pref=${pref.prefCode}`
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return null;
    })) as ReasasPopulationCompositionPerYearResponse | null;

  if (!res) {
    console.error("Failed to fetch data");
    return null;
  }

  if (res.result.data.length === 0) {
    console.error("No data found");
    return null;
  }

  const populationChartData = {
    pref: pref,
    populations: res.result.data,
  };

  return populationChartData;
}

export { getPopulationChartData, type PopulationChartData };
