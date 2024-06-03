type ResasBaseResponse<T> = {
  message: string | null;
  result: T;
};

type ReasasPrefecturesResponse = ResasBaseResponse<
  {
    prefCode: number;
    prefName: string;
  }[]
>;

type ReasasPopulationCompositionPerYearResponse = ResasBaseResponse<{
  boundaryYear: number;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}>;

/** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html} */
type ReasasPopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

export type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPopulationType,
  ReasasPrefecturesResponse,
};
