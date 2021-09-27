import React from "react";
import { Menu } from "./components";
import { createNavigationView } from "./createNavigationView";
import { View, ViewsProvider } from "./viewManager";
import { createPagesListView } from "./createPagesListView";

const pagesListView = createPagesListView();

// Change element props
pagesListView.onProps("lastName", (props) => {
  return {
    ...props,
    label: `${props.label} (upgraded)`,
    placeholder: "Enter your last name",
  };
});

// Add element before/after (wrap)
pagesListView.onElementId("email", (element) => {
  return (
    <div>
      <p>Extra label</p>
      {element}
      <span>Some validation</span>
    </div>
  );
});

// Replace element
pagesListView.onElementId("firstName", (element) => {
  return <p>You're not allowed to see this element! </p>;
});

// Wrap entire view
pagesListView.render.compose((element) => {
  return <div>Custom view wrapper {element}</div>;
});

// Navigation view
const navigationView = createNavigationView();

// Add a new menu item
navigationView.render.compose((element) => {
  return (
    <>
      <h2>Dashboard</h2>
      {element}
    </>
  );
});

// Change Menu component
navigationView.onElement((element) => {
  console.log("element", element);
  if (element.type === Menu.type) {
    return (
      <custom-menu>
        {element.props.label}
        {element.props.children}
      </custom-menu>
    );
  }
  return element;
});

navigationView.onElementId("asyncMenu", () => {
  console.log("delete asyncMenu");
  return null;
});

const views = {
  "pages.list": pagesListView,
  navigation: navigationView,
};

export default () => {
  return (
    <ViewsProvider views={views}>
      <div style={{ display: "flex" }}>
        <div>
          <View id={"navigation"} />
        </div>
        <div>
          <View id={"pages.list"} />
        </div>
      </div>
    </ViewsProvider>
  );
};
