import classNames from "classnames";

type Props = {
  header: string;
  className?: string;
};
export const Section: React.FC<Props> = ({ className, header, children }) => {
  const classes = classNames(className, "shadow rounded-lg bg-white p-4");
  return (
    <div className={classes}>
      <h3 className="text-indigo-800 stroke-fuchsia-600 pb-2 uppercase">
        {header}
      </h3>
      {children}
    </div>
  );
};
