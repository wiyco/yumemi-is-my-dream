"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { FullScreen } from "@/components/FullScreen";
import { Modal, modalAtom } from "@/components/Modal";
import { fetcher } from "@/lib/swr";
import type { ReasasPrefecturesResponse } from "@/types/resas";
import {
  getPopulationChartData,
  type PopulationChartData,
} from "@/utils/fetcher";

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
  if (error)
    return (
      <FullScreen>
        <p>Error!</p>
      </FullScreen>
    );

  return (
    <>
      <main className="grid h-dvh w-full content-around p-6">
        {populationChartData.length === 0 ? (
          <div className="grid h-[400px] place-content-center">
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
              },
            ]}
            series={populationChartData.map(({ pref, populations }) => ({
              data: populations,
              label: pref.prefName,
            }))}
          />
        )}
        <section className="grid h-16 w-full content-start justify-items-center">
          <button
            className="rounded-full bg-neutral-400 px-4 py-2.5 shadow-md dark:bg-neutral-600"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            都道府県を選択する
          </button>
        </section>
      </main>
      <Modal header="都道府県の選択">
        <ul className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {data?.result.map(({ prefCode, prefName }) => (
            <li key={prefCode} className="flex items-center gap-1.5">
              <input
                type="checkbox"
                id={prefCode.toString()}
                value={prefCode}
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
              />
              <label htmlFor={prefCode.toString()}>{prefName}</label>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
