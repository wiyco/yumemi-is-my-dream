import type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPrefecturesResponse,
} from "@/types/resas";

type PopulationChartData = {
  /** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html} */
  type: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
  pref: ReasasPrefecturesResponse["result"][0];
  years: ReasasPopulationCompositionPerYearResponse["result"]["data"][0]["data"][0]["year"][];
  populations: ReasasPopulationCompositionPerYearResponse["result"]["data"][0]["data"][0]["value"][];
};

async function getPopulationChartData({
  type,
  pref,
}: {
  type: PopulationChartData["type"];
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

  const targetTypeData = res.result.data.find((d) => d.label === type);

  if (!targetTypeData) {
    console.error("No data found for the specified type", type);
    return null;
  }

  const populationChartData = {
    type: type,
    pref: pref,
    years: targetTypeData.data.map((d) => d.year),
    populations: targetTypeData.data.map((d) => d.value),
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
