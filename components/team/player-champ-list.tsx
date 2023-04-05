import { useState } from "react";
import { PlayerChampion } from "../../types/teams";
import { useDrag, useDrop } from "react-dnd";
import Card from "../card";
import classNames from "classnames";

type Props = {
  champions: PlayerChampion[];
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
