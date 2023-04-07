import { useContext, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  Champion,
  PlayerChampion,
  PlayerUi,
  Role,
  Team,
} from "../../types/teams";
import { TabNav, Tab } from "../tab-nav";
import ChampSelect from "../champ-select";
import { PlayerChampList } from "./player-champ-list";
import { PlayerChampData } from "./player-champ-data";
import { ChampionContext } from "../context/champion-context";
import { Mutator } from "../../types/db";

type Props = {
  team: Team;
  player: PlayerUi;
};

type CustomTab = Pick<Tab, "name"> & {
  key: Role;
};
export const PlayerChamps: React.FC<Props> = ({ team, player }) => {
  const defaultTabs: CustomTab[] = [
    { name: "Top", key: "top" },
    { name: "Jungle", key: "jg" },
    { name: "Mid", key: "mid" },
    { name: "ADC", key: "adc" },
    { name: "Support", key: "sup" },
  ];

  const initializeTabs = () => {
    return defaultTabs.map((t) => {
      // top is our fallback 'preferred'
      if (t.key === player.preferredRole?.toLowerCase() || t.key === "top") {
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

  const selectedRole = tabs.find((t) => t.current);
  let playerChamps: string[] = [];
  if (selectedRole && player.roles && player.roles[selectedRole.key]) {
    // @ts-expect-error ts fail
    playerChamps = player.roles[selectedRole.key].champions;
  }

  const playerTopWrChamps = ["Akali", "Azir", "Ahri"];

  const champions = useContext(ChampionContext);
  const [selectedChamp, setSelectedChamp] = useState<Champion>();

  const onAdd = (champion: Champion) => {
    fetch("/api/team/players/roles/append-champion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: player.email,
        champion: champion.name,
        role: selectedRole?.key,
      }),
    });
  };

  return (
    <div>
      <h2>{player.name}</h2>
      <TabNav tabs={tabs} onChange={onTabClick} />
      <div className="flex">
        <div className="w-1/3 pt-2">
          <PlayerChampList key={selectedRole?.key} champions={playerChamps} />
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
                <PlayerChampData
                  onAdd={onAdd}
                  champion={selectedChamp}
                  player={player}
                />
              </div>
            )}
            {playerTopWrChamps.map((ptc) => (
              <div className="my-4">
                <PlayerChampData
                  onAdd={onAdd}
                  champion={champions[ptc]}
                  player={player}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
