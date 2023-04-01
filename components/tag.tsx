type Props = {
  text: string;
  color: string;
  className?: string;
};
export const Tag: React.FC<Props> = ({ text, color, className }) => {
  return (
    <div className={`${color} max-w-[150px] rounded-lg m-2 pl-2 ${className}`}>
      {text}
    </div>
  );
};

export default Tag;
