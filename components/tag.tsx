type Props = {
  text: string;
  color: string;
};
export const Tag: React.FC<Props> = ({ text, color }) => {
  return <div className={`${color} w-1/12 rounded-lg m-2 pl-2`}>{text}</div>;
};

export default Tag;
