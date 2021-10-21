import React from "react";
import { PagesListView, Input } from "./views/PagesListView";

const CustomFirstName = (Component) => (props) => {
  return (
    <div className={"flex-child"}>
      <span>Custom First Name</span>
      <Component {...props} disabled={true} />

      <span>Additional Field</span>
      <Input label={"Extra"} placeholder={"Any additional information"} />
    </div>
  );
};

export const App = () => {
  return <PagesListView firstName={CustomFirstName} />;
};
