import { ChangeEvent } from "react";
import { Role } from "../types/teams";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export type Tab = {
  name: string;
  key: Role;
  current: boolean;
  icon?: any;
};

type Props = {
  tabs: Tab[];
  onChange: (option: string) => void;
};
export const TabNav: React.FC<Props> = ({ tabs, onChange }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.icon && (
                  <tab.icon
                    className={classNames(
                      tab.current
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{tab.name}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
