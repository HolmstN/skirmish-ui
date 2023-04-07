import classNames from "classnames";
import { Champion, PlayerUi } from "../../types/teams";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { ChampionContext } from "../context/champion-context";
import { champImageUri } from "../../helpers/champ-image-uri";
import Button from "../button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Tag from "../tag";

type Stat = {
  name: string;
  stat: string;
  previousStat?: string;
  change?: string;
  changeType?: string;
};

type Props = {
  player: PlayerUi;
  champion: Champion;
  className?: string;
  onAdd: (champion: Champion) => void;
};
export const PlayerChampData: React.FC<Props> = ({
  player,
  champion,
  className,
  onAdd,
}) => {
  // mocking for now
  const stats = [
    {
      name: "Win Rate",
      stat: "90%",
      previousStat: "20%",
      change: "70%",
      changeType: "increase",
    },
    {
      name: "KDA",
      stat: "4.05",
    },
    {
      name: "CS/M",
      stat: "7.0",
    },
  ];

  return (
    <div className="bg-white grid grid-rows-4 divide-y divide-gray-200 shadow border border-gray-200 rounded-lg">
      <div className="ml-2 row-span-1 flex gap-2 items-center">
        <img src={champImageUri(champion)} className="w-10 h-10 rounded-full" />
        <h3 className="flex-1 text-base font-semibold leading-6 text-gray-900">
          {champion.name}
        </h3>
        <PlusCircleIcon
          onClick={() => onAdd(champion)}
          className="w-6 h-6 mr-2 text-indigo-700 hover:text-indigo-300"
        />
      </div>
      <dl className="row-span-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                {item.previousStat && (
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    from {item.previousStat}
                  </span>
                )}
                {item.change && <ItemChange stat={item} />}
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mx-2 pt-1">
        {champion.tags.map((t) => (
          <span className="mx-1">
            <Tag color={"gray"}>{t}</Tag>
          </span>
        ))}
      </div>
    </div>
  );
};

const ItemChange: React.FC<{ stat: Stat }> = ({ stat }) => {
  return (
    <div
      className={classNames(
        stat.changeType === "increase"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800",
        "inline-flex items-baseline rounded-full ml-2 px-1.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
      )}
    >
      {stat.changeType === "increase" ? (
        <ArrowUpIcon
          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
          aria-hidden="true"
        />
      ) : (
        <ArrowDownIcon
          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
          aria-hidden="true"
        />
      )}

      <span className="sr-only">
        {" "}
        {stat.changeType === "increase" ? "Increased" : "Decreased"} by{" "}
      </span>
      {stat.change}
    </div>
  );
};
