/** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html} */
type ResasBaseResponse<T> = {
  message: string | null;
  result: T;
};

/** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html} */
type ResasPrefecturesResponse = ResasBaseResponse<
  {
    prefCode: number;
    prefName: string;
  }[]
>;

/** @see {@link https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html} */
type ResasPopulationCompositionPerYearResponse = ResasBaseResponse<{
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
type ResasPopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

export type {
  ResasPopulationCompositionPerYearResponse,
  ResasPopulationType,
  ResasPrefecturesResponse,
};
