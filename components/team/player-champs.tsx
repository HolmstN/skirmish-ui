import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { StarIcon } from "@heroicons/react/24/solid";
import { Champion, PlayerUi, Role } from "../../types/teams";
import { TabNav, Tab } from "../tab-nav";
import Card from "../card";

type Props = {
  player: PlayerUi;
};

type CustomTab = Pick<Tab, "name"> & {
  key: Role;
};
export const PlayerChamps: React.FC<Props> = ({ player }) => {
  const defaultTabs: CustomTab[] = [
    { name: "Top", key: "top" },
    { name: "Jungle", key: "jg" },
    { name: "Mid", key: "mid" },
    { name: "ADC", key: "adc" },
    { name: "Support", key: "sup" },
  ];

  const initializeTabs = () => {
    return defaultTabs.map((t) => {
      if (t.name.toLowerCase() === player.preferredRole.toLowerCase()) {
        return {
          ...t,
          current: true,
          icon: StarIcon,
        };
      }

      return { ...t, current: false };
    });
  };
  const [tabs, setTabs] = useState<(Tab & { key: Role })[]>(initializeTabs);

  const onTabClick = (role: string) => {
    setTabs((oldTabs) =>
      oldTabs.map((t) => {
        if (t.key.toLowerCase() === role.toLowerCase()) {
          return {
            ...t,
            current: true,
          };
        }

        return { ...t, current: false };
      })
    );
  };

  const current = tabs.find((t) => t.current);
  const champions = current ? player.roles[current.key]?.champions || [] : [];

  return (
    <div>
      <h2>{player.name}</h2>
      <TabNav tabs={tabs} onChange={onTabClick} />

      <Champs key={current?.key} champions={champions} />
    </div>
  );
};

type ChampsProps = {
  champions: Champion[];
};

const Champs: React.FC<ChampsProps> = ({ champions }) => {
  const getInitialChamps = () =>
    champions.sort((a, b) => a.preference - b.preference);

  const [champsOrdered, setChampsOrdered] =
    useState<Champion[]>(getInitialChamps);

  const reorder = (champ: string, to: number) => {
    setChampsOrdered((co) => {
      const champIndex = co.findIndex((c) => c.name === champ);

      // don't do anything
      if (champIndex === to) {
        return co;
      }

      const newCo = co.filter((c) => c.name !== champ);

      newCo.splice(to, 0, { name: champ, preference: 0 });
      return newCo.map((c, i) => ({ ...c, preference: i }));
    });
  };

  return (
    <div className="pt-4">
      <div className="text-sm text-gray-500">Drag to Reorder</div>
      {champsOrdered.map((c, i) => (
        <Champ key={c.name} champion={c} reorder={reorder} />
      ))}
    </div>
  );
};

type ChampProps = {
  champion: Champion;
  reorder: (champ: string, to: number) => void;
};

const CHAMPION = "CHAMPION";
const Champ: React.FC<ChampProps> = ({ champion, reorder }) => {
  const [{ isDragging }, dragRef, dragPreview] = useDrag(
    () => ({
      type: CHAMPION,
      item: { name: champion.name },
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
        return (item as { name: string }).name !== champion.name;
      },
      drop: (item) => {
        reorder((item as { name: string }).name, champion.preference);
      },
    }),
    [champion.preference]
  );

  const opacity = isDragging ? "opacity-50" : "opacity-100";
  const colorize = isOver && canDrop ? "bg-indigo-700" : "";

  const champImage = `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champion.name.replaceAll(
    /\s/g,
    ""
  )}.png`;
  const ChampImage = <img src={champImage} className="w-12 h-12 rounded" />;
  return (
    <div ref={drop} className={`flex items-center w-1/3 py-2 ${opacity}`}>
      <span className="pr-2 font-bold">{champion.preference + 1}:</span>
      <div ref={dragRef} className="flex flex-1">
        <Card className={`flex-1 ${colorize}`} leftComponent={ChampImage}>
          {champion.name}
        </Card>
      </div>
    </div>
  );
};
