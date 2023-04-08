import { useContext, useMemo, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Champion, PlayerUi, Role, Team } from "../../types/teams";
import { TabNav, Tab } from "../tab-nav";
import ChampSelect from "../champ-select";
import { PlayerChampList } from "./player-champ-list";
import { PlayerChampData } from "./player-champ-data";
import { ChampionContext } from "../context/champion-context";
import { fetcher } from "../../helpers/fetcher";
import useSWR from "swr";
import { Mastery } from "../../types/riot/mastery";

type Props = {
  player: PlayerUi;
};

type CustomTab = Pick<Tab, "name"> & {
  key: Role;
};
export const PlayerChamps: React.FC<Props> = ({ player }) => {
  const { data: team, mutate } = useSWR("/api/team", fetcher);
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
  const playerChamps: string[] = useMemo(() => {
    if (selectedRole && player.roles && player.roles[selectedRole.key]) {
      // @ts-expect-error ts fail
      return player.roles[selectedRole.key].champions;
    }
    return [];
  }, [selectedRole?.key, team]);

  const [selectedChamp, setSelectedChamp] = useState<Champion>();

  const onAdd = async (champion: Champion) => {
    await fetch("/api/team/players/roles/append-champion", {
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

    const pi = team.players.findIndex(
      (p: { name: string }) => p.name === player.name
    );
    const newTeam = { ...team };
    // @ts-expect-error
    newTeam.players[pi].roles[selectedRole.key].champions.push(champion.name);
    mutate({ ...newTeam });
  };

  const reorder = async (champ: string, to: number) => {
    const champIndex = playerChamps.findIndex((c) => c === champ);

    // don't do anything
    if (champIndex === to) {
      return;
    }

    const newChampions = playerChamps.filter((c) => c !== champ);
    newChampions.splice(to, 0, champ);

    await fetch("/api/team/players/roles/reorder-champions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        champions: newChampions,
        email: player.email,
        role: selectedRole?.key,
      }),
    });

    const pi = team.players.findIndex(
      (p: { name: string }) => p.name === player.name
    );

    const newTeam = { ...team };
    // @ts-expect-error
    newTeam.players[pi].roles[selectedRole.key].champions = newChampions;
    mutate({ ...newTeam });
  };

  return (
    <div>
      <h2>{player.name}</h2>
      <TabNav tabs={tabs} onChange={onTabClick} />
      <div className="flex">
        <div className="w-1/3 pt-2">
          <PlayerChampList reorder={reorder} champions={playerChamps} />
        </div>
        <ChampMasteries
          player={player}
          selectedChamp={selectedChamp}
          setSelectedChamp={setSelectedChamp}
          onAdd={onAdd}
          playerChamps={playerChamps}
        />
      </div>
    </div>
  );
};

type ChampMasteriesProps = {
  player: PlayerUi;
  selectedChamp?: Champion;
  setSelectedChamp: (champion: Champion) => void;
  onAdd: (champion: Champion) => void;
  playerChamps: string[];
};
const ChampMasteries: React.FC<ChampMasteriesProps> = ({
  player,
  selectedChamp,
  setSelectedChamp,
  onAdd,
  playerChamps,
}) => {
  const { data: playerChampMasteries, isLoading } = useSWR<Mastery[]>(
    `/api/player/${player.name}/champion-masteries`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="pt-2 flex flex-col items-end">
        <ChampSelect
          selectedChampion={selectedChamp}
          onSelect={setSelectedChamp}
          label="Search Champion"
        />
        Loading
      </div>
    );
  }

  if (
    playerChampMasteries?.error ||
    !playerChampMasteries ||
    !playerChampMasteries.length
  ) {
    return (
      <div className="pt-2 flex flex-col items-end">
        <ChampSelect
          selectedChampion={selectedChamp}
          onSelect={setSelectedChamp}
          label="Search Champion"
        />
        Something went wrong
      </div>
    );
  }

  const champions = useContext(ChampionContext);
  const playerChampNamesToChampions = playerChamps.map((c) => champions[c]);

  return (
    <div className="pt-2 flex flex-col items-end">
      <ChampSelect
        selectedChampion={selectedChamp}
        onSelect={setSelectedChamp}
        label="Search Champion"
      />
      <div className="mt-2 ml-4">
        {playerChampMasteries && selectedChamp && (
          <div className="my-4">
            <PlayerChampData
              onAdd={onAdd}
              key={selectedChamp.id}
              mastery={playerChampMasteries.find(
                (m) => m.championId.toString() === selectedChamp.key
              )}
              player={player}
            />
          </div>
        )}
        {playerChampMasteries &&
          playerChampMasteries.map((m) => {
            // todo: this seems rough
            if (
              playerChampNamesToChampions.find(
                (pc) => pc.key === m.championId.toString()
              )
            ) {
              return null;
            }

            return (
              <div key={m.championId} className="my-4">
                <PlayerChampData onAdd={onAdd} mastery={m} player={player} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
