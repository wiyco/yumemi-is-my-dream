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

export type { ReasasPrefecturesResponse };
