import React from "react";

type Props = {
  header: string;
};
export const Layout: React.FC<Props> = ({ header, children }) => {
  return (
    <div className="dark:text-white px-32">
      <h1 className="font-bold">{header}</h1>
      {children}
    </div>
  );
};

export default Layout;
