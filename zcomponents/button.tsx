import classnames from "classnames";

type Props = {
  className?: string;
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
export const Button: React.FC<Props> = ({
  onClick,
  children,
  className,
  size: maybeSize,
}) => {
  let size = maybeSize || "md";

  const classes = classnames(
    `bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
    {
      "text-xs": size === "xs",
      "text-sm": size !== "xs",
      "px-2 py-1": ["xs", "sm"].includes(size),
      "px-2.5 py-1.5": size === "md",
      "px-3 py-2": size === "lg",
      "px 3.5 py-2.5": size === "xl",
      rounded: !className?.includes("rounded"),
    },
    className
  );

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
