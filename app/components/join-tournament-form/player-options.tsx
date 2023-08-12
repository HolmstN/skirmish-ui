import { RadioGroup } from "@headlessui/react";
import { Label } from "../client/label";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  role?: string;
  onClickRole: (role: string) => void;
};

const roles = ["Top", "Jg", "Mid", "ADC", "Sup"];

export const PlayerOptions: React.FC<Props> = ({ role, onClickRole }) => {
  return (
    <div>
      <Label htmlFor="role-select">Select Role</Label>
      <RadioGroup value={role} onChange={onClickRole}>
        <div className="mt-4 flex items-center space-x-3">
          {roles.map((role) => (
            <RadioGroup.Option
              key={role}
              value={role}
              className={({ active, checked }) =>
                classNames(
                  {
                    ["dark:bg-amber-500 ring ring-offset-1"]: active && checked,
                    ["dark:bg-amber-500 ring-2"]: !active && checked,
                  },
                  "group rounded-full dark:bg-indigo-700 dark:hover:bg-amber-600 flex cursor-pointer items-center justify-center rounded-full focus:outline-none dark:ring-indigo-600"
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {role}
              </RadioGroup.Label>
              <div className="p-2">
                <Image
                  width={200}
                  height={200}
                  className={classNames(
                    "h-8 w-8 rounded-full grayscale contrast-100 group-focus:sepia"
                  )}
                  src={`/ranked-positions/${role.toLowerCase()}.png`}
                  alt={role}
                />
              </div>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
