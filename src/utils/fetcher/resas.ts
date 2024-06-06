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
  try {
    const res = await fetch(
      `/api/v1/population/composition/years?pref=${pref.prefCode}`,
      {
        next: {
          revalidate: 1440, // 24 hours
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch data");

    const data: ReasasPopulationCompositionPerYearResponse = await res.json();
    if (!data || data.result.data.length === 0)
      throw new Error("No data found");

    return {
      pref: pref,
      populations: data.result.data,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch data");
  }
}

export { getPopulationChartData, type PopulationChartData };
