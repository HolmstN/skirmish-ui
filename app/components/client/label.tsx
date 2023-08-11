import classNames from "classnames";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export const Label: React.FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children, htmlFor, className }) => {
  const classes = classNames(
    className,
    "block text-sm font-medium text-gray-900 dark:text-slate-400"
  );

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  );
};
