"use client";

import "./page.scss";

import { useState } from "react";
import useSWR from "swr";

import { Accordion } from "@/components/Accordion";
import { Checkbox } from "@/components/Checkbox";
import { LineChart } from "@/components/LineChart";
import { Select } from "@/components/Select";
import { Sidebar } from "@/components/Sidebar";
import { fetcher } from "@/lib/swr";
import type {
  ReasasPopulationType,
  ReasasPrefecturesResponse,
} from "@/types/resas";
import {
  getPopulationChartData,
  type PopulationChartData,
} from "@/utils/fetcher/resas";

export default function Page() {
  const [populationType, setPopulationType] =
    useState<ReasasPopulationType>("総人口");
  const [populationChartData, setPopulationChartData] = useState<
    PopulationChartData[]
  >([]);

  const { data, error, isLoading } = useSWR<ReasasPrefecturesResponse>(
    "/api/v1/prefectures",
    fetcher
  );

  return (
    <>
      <main className="chart-page-main">
        <Sidebar className="chart-sidebar-root">
          <Select
            id="population-data-type"
            label="構成："
            options={[
              { label: "総人口", value: "総人口" },
              { label: "年少人口", value: "年少人口" },
              { label: "生産年齢人口", value: "生産年齢人口" },
              { label: "老年人口", value: "老年人口" },
            ]}
            onChange={(e) => {
              setPopulationType(e.target.value as ReasasPopulationType);
            }}
          />
          <Accordion header={<h2>都道府県を選択する</h2>}>
            <section className="grid justify-items-center p-1">
              {isLoading || !data ? (
                !error ? (
                  <p>読み込み中...</p>
                ) : (
                  <p>エラー</p>
                )
              ) : (
                <ul className="chart-prefecture-list text-sm">
                  {data.result.map(({ prefCode, prefName }, index) => (
                    <li key={index}>
                      <Checkbox
                        id={`chart-prefecture-${prefCode}`}
                        onChange={async (e) => {
                          if (e.target.checked) {
                            const targetPref = {
                              prefCode,
                              prefName,
                            };
                            const targetData = await getPopulationChartData({
                              pref: targetPref,
                            });
                            if (!targetData) return;
                            setPopulationChartData((prev) => [
                              ...prev,
                              targetData,
                            ]);
                          } else {
                            setPopulationChartData((prev) =>
                              prev.filter(
                                ({ pref }) => pref.prefCode !== prefCode
                              )
                            );
                          }
                        }}
                      >
                        {prefName}
                      </Checkbox>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Accordion>
        </Sidebar>
        <section className="chart-display-root">
          {populationChartData.length === 0 ? (
            <div className=" grid h-full w-full place-content-center">
              <p className="text-center">都道府県を選択してください</p>
            </div>
          ) : (
            <LineChart
              title={populationType}
              data={{
                labels:
                  populationChartData[0].populations
                    .find((d) => d.label === populationType)
                    ?.data.map((d) => d.year) ?? [],
                datasets: populationChartData.map(({ pref, populations }) => ({
                  label: pref.prefName,
                  data:
                    populations
                      .find((d) => d.label === populationType)
                      ?.data.map((d) => d.value) ?? [],
                })),
              }}
            />
          )}
        </section>
      </main>
    </>
  );
}
