"use client";

import { useState } from "react";
import Button from "../../components/client/button";
import { Input } from "../../components/client/input";
import SkirmishCombobox from "../../components/client/combobox";
import { useLegionRegions } from "../../hooks/use-league-constants";

type Props = {};
export const UnlinkedAccount: React.FC<Props> = () => {
  const [account, setAccount] = useState<string>();
  const [game, setGame] = useState<{ id: number | string; label: string }>({
    id: 1,
    label: "League of Legends",
  });

  const { REGION_OPTIONS } = useLegionRegions();
  const [region, setRegion] = useState<{
    id: number | string;
    label: string;
  }>({ id: 0, label: "" });

  return (
    <div className="mx-auto max-w-lg">
      <div>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
            Link Account
          </h2>
        </div>
        <div className="py-2">
          <SkirmishCombobox
            selected={game}
            onChange={setGame}
            label="Choose Game (Soon™)"
            options={[{ id: 1, label: "League of Legends" }]}
            disabled={true}
          />
        </div>
        <div className="mt-6 flex">
          <Input
            onChange={(e) => setAccount(e.target.value)}
            label="Your Game Account Name"
            id="connect-to-account"
            placeholder="Your Game Account Name"
            includeLabel={true}
            wrapperDivClassName="flex-auto pr-2"
          />
          <div className="flex-initial w-32">
            <SkirmishCombobox
              label="Game Region"
              options={REGION_OPTIONS}
              onChange={setRegion}
              selected={region}
            />
          </div>
          <div className="flex flex-col justify-end mb-px">
            <Button
              onClick={() => {}}
              className="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
