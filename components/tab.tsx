type TabProps = {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  icon?: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
  >;
};

export const Tab: React.FC<TabProps> = ({
  children,
  onClick,
  className: defaultClasses,
  selected,
}) => {
  let className = `flex-auto border rounded-md py-2 pl-2 m-2 cursor-pointer ${defaultClasses}`;
  if (selected) {
    className += " bg-slate-500";
  }
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};
