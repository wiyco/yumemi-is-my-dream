"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { FullScreen } from "@/components/FullScreen";
import { Modal, modalAtom } from "@/components/Modal";
import { fetcher } from "@/lib/swr";
import type {
  ReasasPopulationCompositionPerYearResponse,
  ReasasPrefecturesResponse,
} from "@/types/resas";

type Populations = {
  pref: ReasasPrefecturesResponse["result"][0];
  data: ReasasPopulationCompositionPerYearResponse["result"]["data"][0]["data"];
};

export default function Page() {
  const [, setIsModalOpen] = useAtom(modalAtom);

  const [newPref, setNewPref] = useState<Populations["pref"] | null>(null);

  const [populations, setPopulations] = useState<Populations[]>([]);

  useEffect(() => {
    if (newPref?.prefCode) {
      fetch(`/api/v1/population/composition/years?pref=${newPref.prefCode}`)
        .then((res) => res.json())
        .then((data: ReasasPopulationCompositionPerYearResponse) => {
          setPopulations((prev) => [
            ...prev,
            {
              pref: {
                prefCode: newPref.prefCode,
                prefName: newPref.prefName,
              },
              data: data.result.data[0].data, // 総人口
            },
          ]);
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
        <Chart
          xAxis={[
            {
              data: populations[0]?.data.map(({ year }) => year),
            },
          ]}
          series={populations.map(({ pref, data }) => ({
            data: data.map(({ value }) => value),
            label: pref.prefName,
          }))}
        />
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
                    setPopulations((prev) =>
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
