import React from "react";
import { withViewElement } from "../viewManager";

const MenuComponent = ({ label, children }) => {
  return (
    <div>
      {label}
      <ul>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { key: index })
        )}
      </ul>
    </div>
  );
};

export const Menu = withViewElement(MenuComponent);
Menu.type = MenuComponent;

export const Section = withViewElement(({ label, children }) => {
  return (
    <li>
      {label}
      <ul>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { key: index })
        )}
      </ul>
    </li>
  );
});

export const Item = withViewElement(({ label }) => {
  return <a href={"#"}>{label}</a>;
});
