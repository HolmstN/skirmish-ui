import classnames from "classnames";

type Props = {
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  className?: string;
  onRemove?: () => {};
  onClick?: () => {};
};

export const Tag: React.FC<Props> = ({
  children,
  color,
  className: overrideClasses,
  onClick,
  onRemove,
}) => {
  const getColors = (): { bg: string; remove: string } => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100 text-blue-800",
          remove:
            "text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500",
        };

      case "gray":
        return {
          bg: "bg-gray-100 text-gray-800",
          remove:
            "text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500",
        };

      case "green":
        return {
          bg: "bg-green-100 text-green-800",
          remove:
            "text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500",
        };

      case "indigo":
        return {
          bg: "bg-indigo-100 text-indigo-800",
          remove:
            "text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500",
        };

      case "pink":
        return {
          bg: "bg-pink-100 text-pink-800",
          remove:
            "text-pink-400 hover:bg-pink-200 hover:text-pink-500 focus:bg-pink-500",
        };

      case "purple":
        return {
          bg: "bg-purple-100 text-purple-800",
          remove:
            "text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:bg-purple-500",
        };

      case "red":
        return {
          bg: "bg-red-100 text-red-800",
          remove:
            "text-red-400 hover:bg-red-200 hover:text-red-500 focus:bg-red-500",
        };

      case "yellow":
        return {
          bg: "bg-yellow-100 text-yellow-800",
          remove:
            "text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500",
        };

      default:
        return {
          bg: "bg-gray-300 text-gray-800",
          remove:
            "text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500",
        };
    }
  };

  const { bg, remove } = getColors();

  const className = classnames(
    "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium",
    overrideClasses,
    bg,
    { "pr-1": !!onRemove }
  );

  return (
    <span className={className} onClick={onClick}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={classnames(
            "ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none",
            remove
          )}
        >
          <span className="sr-only">Remove option {children}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Tag;
