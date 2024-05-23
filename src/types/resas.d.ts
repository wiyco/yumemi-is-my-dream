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

export type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPrefecturesResponse,
};
