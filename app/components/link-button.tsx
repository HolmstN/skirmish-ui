import classnames from "classnames";
import Link from "next/link";

type Props = {
  href: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
export const LinkButton: React.FC<Props> = ({
  href,
  children,
  className,
  size: maybeSize,
}) => {
  let size = maybeSize || "md";

  const classes = classnames(
    `bg-sky-600 font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`,
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
    <Link href={href}>
      <div className={classes}>{children}</div>
    </Link>
  );
};
