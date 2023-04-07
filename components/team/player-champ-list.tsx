import { useState } from "react";
import { PlayerChampion } from "../../types/teams";
import { useDrag, useDrop } from "react-dnd";
import Card from "../card";
import classNames from "classnames";

type Props = {
  champions: string[];
  className?: string;
};

export const PlayerChampList: React.FC<Props> = ({ champions, className }) => {
  const getInitialChamps = () =>
    champions.sort((a, b) => a.preference - b.preference);

  const [champsOrdered, setChampsOrdered] =
    useState<PlayerChampion[]>(getInitialChamps);

  const reorder = (champ: string, to: number) => {
    setChampsOrdered((co) => {
      const champIndex = co.findIndex((c) => c.championKey === champ);

      // don't do anything
      if (champIndex === to) {
        return co;
      }

      const newCo = co.filter((c) => c.championKey !== champ);

      newCo.splice(to, 0, { championKey: champ, preference: 0 });
      return newCo.map((c, i) => ({ ...c, preference: i }));
    });
  };

  if (champions.length === 0) {
    return (
      <div className={classNames("pt-4", className)}>
        <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>

          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Add a champion from the right
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames("pt-4", className)}>
      <div className="text-sm text-gray-500">Drag to Reorder</div>
      {champsOrdered.map((c, i) => (
        <PlayerChampCardDraggable
          key={c.championKey}
          champion={c}
          reorder={reorder}
        />
      ))}
    </div>
  );
};

type ChampProps = {
  champion: PlayerChampion;
  reorder: (champ: string, to: number) => void;
};

const CHAMPION = "CHAMPION";
const PlayerChampCardDraggable: React.FC<ChampProps> = ({
  champion,
  reorder,
}) => {
  const [{ isDragging }, dragRef, dragPreview] = useDrag(
    () => ({
      type: CHAMPION,
      item: { name: champion.championKey },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [champion]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: CHAMPION,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: (item, monitor) => {
        return (item as { name: string }).name !== champion.championKey;
      },
      drop: (item) => {
        reorder((item as { name: string }).name, champion.preference);
      },
    }),
    [champion.preference]
  );

  const opacity = isDragging ? "opacity-50" : "opacity-100";
  const colorize = isOver && canDrop ? "bg-indigo-700" : "";

  const champImage = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champion.championKey.replaceAll(
    /\s/g,
    ""
  )}.png`;
  const ChampImage = <img src={champImage} className="w-12 h-12 rounded" />;
  return (
    <div ref={drop} className={`flex flex-1 items-center py-2 ${opacity}`}>
      <span className="pr-2 font-bold">{champion.preference + 1}:</span>
      <div ref={dragRef} className="flex flex-1">
        <Card className={`flex-1 ${colorize}`} leftComponent={ChampImage}>
          {champion.championKey}
        </Card>
      </div>
    </div>
  );
};
