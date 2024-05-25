"use client";

import "./page.scss";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { FullScreen } from "@/components/FullScreen";
import { Modal, modalAtom } from "@/components/Modal";
import { fetcher } from "@/lib/swr";
import type { ReasasPrefecturesResponse } from "@/types/resas";
import {
  getPopulationChartData,
  type PopulationChartData,
} from "@/utils/fetcher/resas";

export default function Page() {
  const [, setIsModalOpen] = useAtom(modalAtom);
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

  if (isLoading)
    return (
      <FullScreen>
        <p>Loading...</p>
      </FullScreen>
    );
  if (error || !data)
    return (
      <FullScreen>
        <p>Error!</p>
      </FullScreen>
    );

  return (
    <>
      <main className="chart-page-main">
        <section className="chart-population-section">
          {populationChartData.length === 0 ? (
            <div className=" grid h-full w-full place-content-center">
              <p className="text-center">都道府県を選択してください</p>
            </div>
          ) : (
            <Chart
              xAxis={[
                {
                  data: populationChartData[0]?.years,
                  valueFormatter: (value) => value.toString(),
                  min: Math.min(...(populationChartData[0]?.years ?? [])),
                  max: Math.max(...(populationChartData[0]?.years ?? [])),
                  label: "年度",
                },
              ]}
              series={populationChartData.map(({ pref, populations }) => ({
                data: populations,
                label: pref.prefName,
              }))}
              margin={{ left: 72, right: 16, top: 114, bottom: 48 }}
            />
          )}
        </section>
        <section className="chart-prefecture-section">
          <button
            className="rounded-full bg-neutral-400 px-4 py-2.5 shadow-md dark:bg-neutral-600"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            都道府県を選択する
          </button>
        </section>
      </main>
      <Modal header="都道府県の選択">
        <ul className="chart-prefecture-list">
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
                      prev.filter(({ pref }) => pref.prefCode !== prefCode)
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
      </Modal>
    </>
  );
}
