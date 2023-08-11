import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

type Props = {
  leftComponent?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};
export const Card: React.FC<Props> = ({
  leftComponent,
  className: overrideClasses,
  size = "md",
  children,
}) => {
  const className = classNames(
    "flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200",
    overrideClasses,
    { "border-l rounded-l-md": !leftComponent }
  );

  const textDivClasses = classNames("flex-1 truncate px-4 text-sm", {
    "py-2": size === "sm",
    "py-4": size === "md",
    "py-8 text-md": size === "lg",
  });

  return (
    <div className={className}>
      {leftComponent}
      <div className={textDivClasses}>{children}</div>
      <div className="flex-shrink-0 pr-2">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Card;
