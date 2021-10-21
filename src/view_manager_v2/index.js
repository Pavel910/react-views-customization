import React from "react";
import { ViewsProvider } from "./views/viewManager";
import { PagesListView } from "./views/PagesListView";

const CustomFirstName = (Component) => (props) => {
  return (
    <div className={"flex-child"}>
      <span>Custom First Name</span>
      <Component {...props} disabled={true} />
    </div>
  );
};

const CustomLayout = ({ elements }) => {
  return (
    <div>
      Custom layout
      <ul>
        <li>{elements.firstName}</li>
        <li>{elements.email}</li>
      </ul>
      {React.cloneElement(elements.submitButton, {
        onClick: () => alert("Custom yo!"),
      })}
    </div>
  );
};

const CustomPagesList = (PagesListView) => {
  return (props) => {
    console.log("Mounting CustomPagesList", props);
    return (
      <PagesListView
        elements={{ firstName: CustomFirstName }}
        layout={CustomLayout}
        {...props}
      />
    );
  };
};

export const App = () => {
  return (
    <ViewsProvider views={{ pagesList: CustomPagesList }}>
      {/* This will be rendered somewhere in the react-router, so it won't be directly accessible. */}
      <PagesListView />
    </ViewsProvider>
  );
};
