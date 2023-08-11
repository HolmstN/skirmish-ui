import { useContext, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { ChampionContext } from "./context/champion-context";
import { champImageUri } from "../helpers/champ-image-uri";
import { Champion } from "../types/teams";

const champs = [
  {
    id: 1,
    name: "Teemo",
  },
  {
    id: 2,
    name: "Darius",
  },
  {
    id: 3,
    name: "Shaco",
  },
  {
    id: 4,
    name: "Irelia",
  },
  {
    id: 5,
    name: "Ryze",
  },
];

type Props = {
  label: string;
  selectedChampion?: Champion;
  onSelect: (champion: Champion) => void;
  className?: string;
};
export const ChampSelect: React.FC<Props> = ({
  label,
  selectedChampion,
  onSelect,
  className,
}) => {
  const [query, setQuery] = useState("");

  const champObj = useContext(ChampionContext);
  const champs = Object.values(champObj);

  const filteredChamps =
    query === ""
      ? champs
      : champs.filter((champ) => {
          return champ.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      className={className}
      value={selectedChampion}
      onChange={(c: Champion) => onSelect(c)}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          // @ts-expect-error
          displayValue={(champ) => champ?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredChamps.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredChamps.map((champ) => (
              <Combobox.Option
                key={champ.id}
                value={champ}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={champImageUri(champ)}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {champ.name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default ChampSelect;
