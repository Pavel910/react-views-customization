import React, { useReducer } from "react";
import { createView, withViewElement } from "./viewManager";

const Input = withViewElement((props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type={"text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
});

const PagesListView = () => {
  const [value, setValue] = useReducer((prev, next) => ({ ...prev, ...next }), {
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <>
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
    </>
  );
};

export const createPagesListView = (id) => {
  return createView(id, <PagesListView />);
};
