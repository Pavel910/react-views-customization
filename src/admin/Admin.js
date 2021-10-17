import {
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const Admin = ({ dashboard, layout, catchAll, children }) => {
  const [state, setState] = useState({
    components: { Layout: layout },
    routes: [],
    menus: [{ text: "Dashboard", link: "/" }],
  });

  const adminContext = useMemo(
    () => ({
      components: state.components,
      routes: state.routes,
      menus: state.menus,
      addMenu(menu) {
        setState((state) => {
          return {
            ...state,
            menus: [...state.menus, menu],
          };
        });
      },
      addRoute(route) {
        setState((state) => {
          return {
            ...state,
            routes: [...state.routes, route],
          };
        });
      },
    }),
    [state]
  );

  return (
    <AdminContext.Provider value={adminContext}>
      <BrowserRouter basename={"/"}>
        {children}
        <Switch>
          {state.routes.map((route, key) => cloneElement(route, { key }))}
          <Route exact path="/" component={dashboard} />
          <Route component={catchAll} />
        </Switch>
      </BrowserRouter>
    </AdminContext.Provider>
  );
};
