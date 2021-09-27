import React, { useContext, createContext } from "react";

const ViewsContext = createContext({});

export const ViewsProvider = ({ views, children }) => {
  return (
    <ViewsContext.Provider value={views}>{children}</ViewsContext.Provider>
  );
};

export const useViews = (name) => {
  const views = useContext(ViewsContext);
  return views[name];
};

const ViewContext = createContext({});

export const View = ({ id }) => {
  const view = useViews(id);
  return (
    <ViewContext.Provider value={view}>{view.render()}</ViewContext.Provider>
  );
};

export const useView = () => {
  return useContext(ViewContext);
};

export const withViewElement =
  (Component) =>
  ({ id, ...props }) => {
    const view = useView();
    const element = <Component {...view.modifyProps(id, props)} />;
    return (
      <element-id
        data-id={id}
        style={{
          padding: 5,
          marginBottom: 10,
          display: "block",
          border: "1px solid black",
        }}
      >
        {view.modifyElement(id, element)}
      </element-id>
    );
  };

export function useViewElement(Component, id, props, render) {
  const view = useView();
  const newProps = view.modifyProps(id, props);
  return (
    <element-id
      data-id={id}
      style={{
        padding: 5,
        marginBottom: 10,
        display: "block",
        border: "1px solid black",
      }}
    >
      {view.modifyElement(Component, id, render(newProps))}
    </element-id>
  );
}

export const createView = (id, element) => {
  const propModifiers = {};
  const elementModifiers = {};
  const renderers = [];

  const view = {
    onElement(modifier) {
      elementModifiers["_id_"] = modifier;
    },
    onElementId(id, modifier) {
      elementModifiers[id] = modifier;
    },

    modifyElement(id, element) {
      let newElement = elementModifiers[id]
        ? elementModifiers[id](element)
        : element;

      if (!newElement) {
        return null;
      }

      newElement = elementModifiers["_id_"]
        ? elementModifiers["_id_"](newElement)
        : newElement;

      return newElement;
    },
    ////////////////////////////////////////////////////////////////
    modifyProps(id, props) {
      return propModifiers[id] ? propModifiers[id](props) : props;
    },
    onProps(id, modifier) {
      propModifiers[id] = modifier;
    },
    render() {
      return renderers.reduce((el, render) => render(el), element);
    },
  };

  view.render.compose = function compose(render) {
    renderers.push(render);
  };

  return view;
};
