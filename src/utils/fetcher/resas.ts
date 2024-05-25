import type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPrefecturesResponse,
} from "@/types/resas";

type PopulationChartData = {
  pref: ReasasPrefecturesResponse["result"][0];
  years: ReasasPopulationCompositionPerYearResponse["result"]["data"][0]["data"][0]["year"][];
  populations: ReasasPopulationCompositionPerYearResponse["result"]["data"][0]["data"][0]["value"][];
};

async function getPopulationChartData(
  pref: PopulationChartData["pref"]
): Promise<PopulationChartData | null> {
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
    years: res.result.data[0].data.map((d) => d.year),
    populations: res.result.data[0].data.map((d) => d.value),
  };

  if (
    populationChartData.years.length !== populationChartData.populations.length
  ) {
    console.error("Data length mismatch");
    return null;
  }

  return populationChartData;
}

export { getPopulationChartData, type PopulationChartData };
