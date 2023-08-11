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
                  active && checked ? "ring ring-offset-1" : "",
                  !active && checked ? "ring-2" : "",
                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {role}
              </RadioGroup.Label>
              <div className="group p-2 rounded-full dark:bg-indigo-700 dark:hover:bg-amber-600">
                <Image
                  width={200}
                  height={200}
                  className={classNames(
                    "h-8 w-8 rounded-full group-hover:sepia"
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
