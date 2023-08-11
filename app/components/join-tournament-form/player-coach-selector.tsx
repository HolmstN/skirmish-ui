import classNames from "classnames";
import { Label } from "../client/label";

type Props = {
  setJoinType: (type: "player" | "coach") => void;
  joinType: "player" | "coach";
};
export const PlayerCoachSelector: React.FC<Props> = ({
  setJoinType,
  joinType,
}) => {
  const pillClasses = (jt: "player" | "coach") =>
    classNames(
      joinType === jt
        ? "bg-sky-100 dark:bg-indigo-700 text-sky-700 dark:text-indigo-200"
        : "text-gray-500 dark:text-indigo-400 hover:text-gray-700 dark:hover:text-indigo-100",
      "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
    );

  return (
    <div>
      <Label htmlFor="tabs-coach-player" className="pb-2">
        Join As Coach or Player
      </Label>

      <div className="sm:hidden">
        <select
          id="tabs-coach-player"
          name="tabs-coach-player"
          className="block w-full p-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700"
          defaultValue="player"
          onSelect={(e) =>
            setJoinType(e.currentTarget.value as "player" | "coach")
          }
        >
          <option className="cursor-pointer" value="player">
            Player
          </option>
          <option className="cursor-pointer" value="coach">
            Coach
          </option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div id="tabs-coach-player" className="flex space-x-4">
          <div
            className={pillClasses("player")}
            aria-current={joinType === "player"}
            onClick={() => setJoinType("player")}
          >
            Player
          </div>
          <div
            className={pillClasses("coach")}
            aria-current={joinType === "coach"}
            onClick={() => setJoinType("coach")}
          >
            Coach
          </div>
        </div>
      </div>
    </div>
  );
};
