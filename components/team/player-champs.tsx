import { useContext, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Champion, PlayerUi, Role } from "../../types/teams";
import { TabNav, Tab } from "../tab-nav";
import ChampSelect from "../champ-select";
import { PlayerChampList } from "./player-champ-list";
import { PlayerChampData } from "./player-champ-data";
import { ChampionContext } from "../context/champion-context";

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
  const playerChamps = current
    ? player.roles[current.key]?.champions || []
    : [];

  const playerTopWrChamps = ["Akali", "Azir", "Ahri"];

  const champions = useContext(ChampionContext);
  const [selectedChamp, setSelectedChamp] = useState<Champion>();

  return (
    <div>
      <h2>{player.name}</h2>
      <TabNav tabs={tabs} onChange={onTabClick} />
      <div className="flex">
        <div className="w-1/3 pt-2">
          <PlayerChampList key={current?.key} champions={playerChamps} />
        </div>
        <div className="pt-2 flex flex-col items-end">
          <ChampSelect
            selectedChampion={selectedChamp}
            onSelect={setSelectedChamp}
            label="Search Champion"
          />
          <div className="mt-2 ml-4">
            {selectedChamp && (
              <div className="my-4">
                <PlayerChampData champion={selectedChamp} player={player} />
              </div>
            )}
            {playerTopWrChamps.map((ptc) => (
              <div className="my-4">
                <PlayerChampData champion={champions[ptc]} player={player} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
