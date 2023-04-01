import classnames from "classnames";

type Props = {
  className?: string;
  onClick: () => void;
};
export const Button: React.FC<Props> = ({ onClick, children, className }) => {
  const classes = classnames(
    `${className} p-2 bg-sky-800 rounded-md hover:bg-sky-600 min-w-[150px]`
  );

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
