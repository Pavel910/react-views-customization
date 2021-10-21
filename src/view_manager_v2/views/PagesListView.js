import React, { useReducer } from "react";
import { createView, withViewElement } from "./viewManager";

export const Input = withViewElement((props) => {
  return (
    <div className={"flex-child"}>
      <label>{props.label}</label>
      <input
        type={"text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    </div>
  );
});

Input.displayName = "Input";

const PagesListViewLayout = ({ elements }) => {
  return (
    <div>
      Default layout
      {Object.keys(elements).map((key) =>
        React.cloneElement(elements[key], { key })
      )}
    </div>
  );
};

const PagesListViewComponent = ({ elements, layout }) => {
  const Layout = layout || PagesListViewLayout;

  const [value, setValue] = useReducer((prev, next) => ({ ...prev, ...next }), {
    firstName: "",
    lastName: "",
    email: "",
  });

  const viewElements = {
    firstName: (
      <Input
        id={"firstName"}
        label={"First Name"}
        value={value.firstName}
        onChange={(e) => setValue({ firstName: e.target.value })}
        placeholder={"Enter some text"}
      />
    ),
    lastName: (
      <Input
        id={"lastName"}
        label={"Last Name"}
        value={value.lastName}
        onChange={(e) => setValue({ lastName: e.target.value })}
        placeholder={"Enter some text"}
      />
    ),
    email: (
      <Input
        id={"email"}
        label={"Email"}
        value={value.email}
        onChange={(e) => setValue({ email: e.target.value })}
        placeholder={"Enter some text"}
      />
    ),
    submitButton: <button onClick={() => alert("Yo!")}>Submit</button>,
    ...elements,
  };

  return <Layout elements={viewElements} />;
};

export const PagesListView = createView("pagesList", PagesListViewComponent);
PagesListView.displayName = "PagesListView";
