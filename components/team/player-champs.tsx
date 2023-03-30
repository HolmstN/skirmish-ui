import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
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
    <>
      <nav className="w-1/2 flex justify-between">
        <Tab selected={focusedTab === "top"} onClick={() => onTabClick("top")}>
          Top
        </Tab>
        <Tab selected={focusedTab === "jg"} onClick={() => onTabClick("jg")}>
          Jungle
        </Tab>
        <Tab selected={focusedTab === "mid"} onClick={() => onTabClick("mid")}>
          Mid
        </Tab>
        <Tab selected={focusedTab === "adc"} onClick={() => onTabClick("adc")}>
          ADC
        </Tab>
        <Tab selected={focusedTab === "sup"} onClick={() => onTabClick("sup")}>
          Support
        </Tab>
      </nav>

      {player.roles[focusedTab] && (
        <Champs champions={player.roles[focusedTab]?.champions || []} />
      )}
    </>
  );
};

type TabProps = {
  onClick: () => void;
  selected: boolean;
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
  const [champsOrdered, setChampsOrdered] = useState<Champion[]>(
    champions.sort((a, b) => a.preference - b.preference)
  );

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
      drop: (item) => {
        reorder(item.name, champion.preference);
      },
    }),
    [champion.preference]
  );

  const opacity = isDragging ? "opacity-50" : "opacity-100";
  return (
    <div ref={drop} className={`flex items-center w-1/2 py-2 ${opacity}`}>
      <span className="pr-2 font-bold">{champion.preference}:</span>
      <div
        ref={dragRef}
        role="Handle"
        className="flex-1 py-2 border-y rounded-md"
      >
        {champion.name}
      </div>
    </div>
  );
};
