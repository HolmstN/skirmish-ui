import classNames from "classnames";

type Props = {
  label: string;
  id: string;
  className?: string;
  includeLabel?: boolean;
  labelClassName?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Input: React.FC<Props> = ({
  label,
  id,
  className,
  includeLabel,
  labelClassName,
  placeholder,
  onChange,
}) => {
  const cx = classNames(
    "block w-full rounded-md border-0 pl-2 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6",
    className
  );

  const labelClass = classNames(labelClassName, {
    "sr-only": !includeLabel,
    "block text-sm font-medium leading-6 text-gray-700": includeLabel,
  });

  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {includeLabel && (
        <div className="relative mt-2">
          <input
            type="text"
            name={id}
            id={id}
            className={cx}
            placeholder={placeholder}
            onChange={onChange}
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
        />
      )}
    </>
  );
};
