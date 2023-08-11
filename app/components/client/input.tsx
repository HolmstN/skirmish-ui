import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  id?: string;
  className?: string;
  includeLabel?: boolean;
  labelClassName?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Input: React.FC<
  Props &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({
  label,
  id,
  className,
  includeLabel,
  labelClassName,
  placeholder,
  onChange,
  ...props
}) => {
  const lt =
    "text-gray-700 ring-gray-300 placeholder:text-gray-400 focus:ring-sky-600";
  const dk =
    "dark:bg-transparent dark:text-slate-200 dark:ring-indigo-600 dark:placeholder:text-slate-600 dark:focus:ring-indigo-400";
  const cx = classNames(
    "block w-full rounded-md border-0 pl-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
    lt,
    dk,
    className
  );

  const labelClass = classNames(labelClassName, {
    "sr-only": !includeLabel,
    "block text-sm font-medium leading-6 text-gray-700": includeLabel,
  });

  return (
    <>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      {includeLabel && (
        <div className="relative mt-2">
          <input
            type="text"
            name={id}
            id={id}
            className={cx}
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
        </div>
      )}

      {!includeLabel && (
        <input
          type="text"
          name={id}
          id={id}
          className={cx}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      )}
    </>
  );
};
