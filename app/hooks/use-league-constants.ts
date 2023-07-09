import { useMemo } from "react";

const regionsRaw = {
  code: {
    cs_CZ: "CZ",
    de_DE: "DE",
    el_GR: "GR",
    en_AU: "AU",
    en_GB: "GB",
    en_PL: "PL",
    en_US: "US",
    es_AR: "AR",
    es_ES: "ES",
    es_MX: "MX",
    fr_FR: "FR",
    hu_HU: "HU",
    it_IT: "IT",
    ja_JP: "JP",
    pl_PL: "PL",
    pt_BR: "BR",
    ro_RO: "RO",
    ru_RU: "RU",
    tr_TR: "TR",
  },
  label: {
    CZ: "cs_CZ",
    DE: "de_DE",
    GR: "el_GR",
    AU: "en_AU",
    GB: "en_GB",
    en_PL: "en_PL",
    US: "en_US",
    AR: "es_AR",
    ES: "es_ES",
    MX: "es_MX",
    FR: "fr_FR",
    HU: "hu_HU",
    IT: "it_IT",
    JP: "ja_JP",
    pl_PL: "pl_PL",
    BR: "pt_BR",
    RO: "ro_RO",
    RU: "ru_RU",
    TR: "tr_TR",
  },
};

const allCodes = Object.keys(regionsRaw.code);
const allLabels = Object.keys(regionsRaw.label);

const REGIONS = {
  code: {
    all: allCodes,
    ...regionsRaw.code,
  },
  label: {
    all: allLabels,
    ...regionsRaw.label,
  },
} as const;

export const useLegionRegions = () => {
  let REGION_OPTIONS = useMemo(
    () =>
      allCodes.map((c) => {
        // @ts-expect-error
        return { id: c, label: REGIONS.code[c] };
      }),
    []
  );

  return { REGIONS, REGION_OPTIONS };
};
