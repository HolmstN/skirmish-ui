import classNames from "classnames";

type Props = {
  header?: string;
  className?: string;
  footer?: React.ReactNode;
};
export const Section: React.FC<Props> = ({ className, header, children }) => {
  const classes = classNames(
    "shadow rounded-lg bg-sky-100 dark:bg-slate-900 px-4 pt-4 border border-sky-200 dark:border-slate-800",
    className
  );
  return (
    <div className={classes}>
      {header && (
        <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
          {header}
        </h3>
      )}
      {children}
    </div>
  );
};
