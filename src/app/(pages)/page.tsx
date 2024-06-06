"use client";

import "./page.scss";

import useSWR from "swr";

import { Accordion } from "@/components/Accordion";
import { Checkbox } from "@/components/Checkbox";
import { LineChart } from "@/components/LineChart";
import { Select } from "@/components/Select";
import { Sidebar } from "@/components/Sidebar";
import { fetcher } from "@/lib/swr";
import type { ResasPrefecturesResponse } from "@/types/resas";

import { usePopulationChart, usePopulationType } from "./hooks";

export default function Page() {
  const {
    populationType,
    populationTypeOptions,
    onChangeSelectPopulationType,
  } = usePopulationType();

  const { populationChartData, onCheckPref, onUncheckPref } =
    usePopulationChart();

  const { data, error, isLoading } = useSWR<ResasPrefecturesResponse>(
    "/api/v1/prefectures",
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <>
      <main className="chart-page-main">
        <Sidebar className="chart-sidebar-root">
          <Select
            id="population-data-type"
            label="構成："
            options={populationTypeOptions}
            onChange={(e) => void onChangeSelectPopulationType(e)}
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
                            onCheckPref({
                              prefCode,
                              prefName,
                            });
                          } else {
                            onUncheckPref({
                              prefCode,
                              prefName,
                            });
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
