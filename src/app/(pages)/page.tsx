"use client";

import "./page.scss";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { Accordion } from "@/components/Accordion";
import { Checkbox } from "@/components/Checkbox";
import { LineChart } from "@/components/LineChart";
import { Sidebar } from "@/components/Sidebar";
import { fetcher } from "@/lib/swr";
import type { ReasasPrefecturesResponse } from "@/types/resas";
import {
  getPopulationChartData,
  type PopulationChartData,
} from "@/utils/fetcher/resas";

export default function Page() {
  const [newPref, setNewPref] = useState<PopulationChartData["pref"] | null>(
    null
  );
  const [populationChartData, setPopulationChartData] = useState<
    PopulationChartData[]
  >([]);

  useEffect(() => {
    if (newPref?.prefCode) {
      getPopulationChartData(newPref).then((data) => {
        if (!data) return;
        setPopulationChartData((prev) => [...prev, data]);
      });
    }
  }, [newPref]);

  const { data, error, isLoading } = useSWR<ReasasPrefecturesResponse>(
    "/api/v1/prefectures",
    fetcher
  );

  return (
    <>
      <main className="chart-page-main">
        <Sidebar className="chart-sidebar-root">
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
                    <li key={`chart-prefecture-item-${index}`}>
                      <Checkbox
                        id={`chart-prefecture-${prefCode}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPref({
                              prefCode: prefCode,
                              prefName: prefName,
                            });
                          } else {
                            setPopulationChartData((prev) =>
                              prev.filter(
                                ({ pref }) => pref.prefCode !== prefCode
                              )
                            );
                            setNewPref(null);
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
              title="総人口推移"
              data={{
                labels: populationChartData[0]?.years,
                datasets: populationChartData.map(({ pref, populations }) => ({
                  label: pref.prefName,
                  data: populations,
                })),
              }}
            />
          )}
        </section>
      </main>
    </>
  );
}
