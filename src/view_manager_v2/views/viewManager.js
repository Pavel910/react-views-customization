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
ViewContext.displayName = "ViewContext";

export const View = ({ id, children, ...props }) => {
  return <ViewContext.Provider value={props}>{children}</ViewContext.Provider>;
};

export const useView = () => {
  return useContext(ViewContext);
};

export const withViewElement =
  (Component) =>
  ({ id, ...props }) => {
    const view = useView();
    if (view.elements && view.elements[id]) {
      return React.createElement(view.elements[id](Component), props);
    }

    return <Component {...props} />;
  };

export const createView = (id, ViewComponent) => {
  return (props) => {
    console.log("Mounting View", id, props);
    const CustomView = useViews(id);

    ViewComponent = CustomView ? CustomView(ViewComponent) : ViewComponent;

    return (
      <View id={id} {...props}>
        <ViewComponent {...props} />
      </View>
    );
  };
};
