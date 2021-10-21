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

const PagesListViewComponent = () => {
  const [value, setValue] = useReducer((prev, next) => ({ ...prev, ...next }), {
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <div className={"flex-container"}>
      <Input
        id={"firstName"}
        label={"First Name"}
        value={value.firstName}
        onChange={(e) => setValue({ firstName: e.target.value })}
        placeholder={"Enter some text"}
      />
      <Input
        id={"lastName"}
        label={"Last Name"}
        value={value.lastName}
        onChange={(e) => setValue({ lastName: e.target.value })}
        placeholder={"Enter some text"}
      />
      <Input
        id={"email"}
        label={"Email"}
        value={value.email}
        onChange={(e) => setValue({ email: e.target.value })}
        placeholder={"Enter some text"}
      />
      <Input
        id={"phone"}
        label={"Phone"}
        value={value.email}
        onChange={(e) => setValue({ email: e.target.value })}
        placeholder={"Enter some text"}
      />
      <Input
        id={"address"}
        label={"Address"}
        value={value.email}
        onChange={(e) => setValue({ email: e.target.value })}
        placeholder={"Enter some text"}
      />
    </div>
  );
};

export const PagesListView = createView("pagesList", PagesListViewComponent);
PagesListView.displayName = "PagesListView";
