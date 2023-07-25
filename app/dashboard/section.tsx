import classNames from "classnames";

type Props = {
  header: string;
  className?: string;
};
export const Section: React.FC<Props> = ({ className, header, children }) => {
  const classes = classNames(
    className,
    "shadow rounded-lg bg-white dark:bg-slate-900 p-4 dark:border dark:border-slate-800"
  );
  return (
    <div className={classes}>
      <h3 className="text-sky-800 dark:text-indigo-500 font-bold pb-2 uppercase">
        {header}
      </h3>
      {children}
    </div>
  );
};
