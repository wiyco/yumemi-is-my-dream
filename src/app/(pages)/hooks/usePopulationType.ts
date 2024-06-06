import { resasPopulationTypes } from "@constants/resas";
import { useCallback, useMemo, useState } from "react";

import type { ResasPopulationType } from "@/types/resas";

/**
 * Custom hook for population type
 * @example
 * ```ts
 * const {
 *   populationType,
 *   populationTypeOptions,
 *   onChangeSelectPopulationType,
 * } = usePopulationType();
 * ```
 */
function usePopulationType() {
  const [populationType, setPopulationType] =
    useState<ResasPopulationType>("総人口");

  const populationTypeOptions = useMemo(
    () =>
      resasPopulationTypes.map((type) => ({
        value: type,
        label: type,
      })),
    []
  );

  const onChangeSelectPopulationType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPopulationType(e.target.value as ResasPopulationType);
    },
    []
  );

  return {
    populationType,
    populationTypeOptions,
    onChangeSelectPopulationType,
  };
}

export { usePopulationType };
