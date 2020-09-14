import React from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

type Props = {};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toolbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
