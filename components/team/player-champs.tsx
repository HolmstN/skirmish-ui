import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { StarIcon } from "@heroicons/react/24/solid";
import { Champion, PlayerUi, Role } from "../../types/teams";

type Props = {
  player: PlayerUi;
};
export const PlayerChamps: React.FC<Props> = ({ player }) => {
  const [focusedTab, setFocusedTab] = useState<Role>(player.preferredRole);
  const onTabClick = (role: Role) => {
    setFocusedTab(role);
  };

  return (
    <div>
      <h2>{player.name}</h2>
      <nav className="w-1/2 flex justify-between">
        <Tab selected={focusedTab === "top"} onClick={() => onTabClick("top")}>
          <div className="flex justify-between">
            <span>Top</span>
            {"top" === player.preferredRole && (
              <StarIcon className="h-6 w-6 pr-2" />
            )}
          </div>
        </Tab>
        <Tab selected={focusedTab === "jg"} onClick={() => onTabClick("jg")}>
          <div className="flex">
            <span>Jungle</span>
            {"jg" === player.preferredRole && (
              <StarIcon className="h-6 w-6 pr-2" />
            )}
          </div>
        </Tab>
        <Tab selected={focusedTab === "mid"} onClick={() => onTabClick("mid")}>
          <div className="flex">
            <span>Mid</span>
            {"mid" === player.preferredRole && (
              <StarIcon className="h-6 w-6 pr-2" />
            )}
          </div>
        </Tab>
        <Tab selected={focusedTab === "adc"} onClick={() => onTabClick("adc")}>
          <div className="flex">
            <span>ADC</span>
            {"adc" === player.preferredRole && (
              <StarIcon className="h-6 w-6 pr-2" />
            )}
          </div>
        </Tab>
        <Tab selected={focusedTab === "sup"} onClick={() => onTabClick("sup")}>
          <div className="flex">
            <span>Support</span>
            {"sup" === player.preferredRole && (
              <StarIcon className="h-6 w-6 pr-2" />
            )}
          </div>
        </Tab>
      </nav>

      {player.roles[focusedTab] && (
        <Champs
          key={focusedTab}
          champions={player.roles[focusedTab]?.champions || []}
        />
      )}
    </div>
  );
};

type TabProps = {
  onClick: () => void;
  selected: boolean;
  icon?: typeof StarIcon;
};
const Tab: React.FC<TabProps> = ({ children, onClick, selected }) => {
  let className = "flex-auto border rounded-md py-2 pl-2 m-2 cursor-pointer";
  if (selected) {
    className += " bg-slate-500";
  }
  return (
    <div onClick={onClick} className={className}>
      {children}
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
      <div>Drag to Reorder</div>
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
  const colorize = isOver && canDrop ? "bg-sky-700" : "";
  return (
    <div ref={drop} className={`flex items-center w-1/2 py-2 ${opacity}`}>
      <span className="pr-2 font-bold">{champion.preference + 1}:</span>
      <div
        ref={dragRef}
        role="Handle"
        className={`flex-1 py-2 border-y rounded-md ${colorize}`}
      >
        {champion.name}
      </div>
    </div>
  );
};
