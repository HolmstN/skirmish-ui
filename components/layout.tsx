import React from "react";

type Props = {
  header: string;
};
export const Layout: React.FC<Props> = ({ header, children }) => {
  return (
    <div className="px-32">
      <h1>{header}</h1>
      {children}
    </div>
  );
};

export default Layout;
