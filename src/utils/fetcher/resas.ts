import type {
  ResasPopulationCompositionPerYearResponse,
  ResasPrefecturesResponse,
} from "@/types/resas";

type PopulationChartData = {
  pref: ResasPrefecturesResponse["result"][0];
  populations: ResasPopulationCompositionPerYearResponse["result"]["data"];
};

async function fetchPopulationData({
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

    const data: ResasPopulationCompositionPerYearResponse = await res.json();
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

export { fetchPopulationData, type PopulationChartData };
