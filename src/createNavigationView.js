import React, { useEffect, useState } from "react";
import { Item, Menu, Section } from "./components";
import { createView } from "./viewManager";

const AsyncMenu = () => {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      console.log("Add async menu");
      setMenu(<Menu id={"asyncMenu"} label={"Async Menu"} />);
    }, 2000);
  }, []);

  return menu;
};

const NavigationView = () => {
  return (
    <>
      <Menu id={"pageBuilder"} label={"Page Builder"}>
        <Section label={"Pages"}>
          <Item label={"Pages"} />
          <Item label={"Categories"} />
          <Item label={"Menus"} />
        </Section>
      </Menu>
      <Menu id={"formBuilder"} label={"Form Builder"}>
        <Section label={"Forms"}>
          <Item label={"Forms"} />
          <Item label={"Submissions"} />
        </Section>
      </Menu>
      <AsyncMenu />
    </>
  );
};

export const createNavigationView = (id) => {
  return createView(id, <NavigationView />);
};
