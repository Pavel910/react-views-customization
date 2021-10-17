import React, {
  cloneElement,
  createContext,
  useContext,
  useMemo,
  Children,
  useState,
  useCallback,
} from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { compose } from "./compose";
import backgroundImage from "./welcome/background.png";

const AdminContext = createContext();
AdminContext.displayName = "AdminContext";

export const useAdmin = () => {
  return useContext(AdminContext);
};

// const props = {
//   components: {
//     /* Components registry */
//   },
//   menus: [
//     /* Menus for main navigation */
//   ],
//   routes: [
//     /* react-router routes */
//   ],
//   clients: {
//     /* GraphQL clients */
//   },
//   installers: [
//     /* Application installers */
//   ],
//   providers: [
//     /* React context providers */
//   ],
// };

const WelcomeScreen = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        padding: 20,
        color: "white",
      }}
    >
      <h2>Welcome to Webiny Admin app!</h2>
    </div>
  );
};

const AdminRouter = ({ routes }) => {
  const {
    components: { Dashboard, NotFound },
  } = useAdmin();
  // Deduplicate top level paths
  const deduped = {};
  routes.forEach((route) => {
    const { props } = route;
    if (!(props.path in deduped)) {
      deduped[props.path] = route;
      return;
    }

    // Append routes to existing top-level route
    deduped[props.path] = cloneElement(deduped[props.path], null, [
      ...Children.toArray(deduped[props.path].props.children),
      props.children,
    ]);
  });

  return (
    <BrowserRouter basename={"/"}>
      <Switch>
        {Object.values(deduped).map((route, key) =>
          cloneElement(route, { key })
        )}
        <Route exact path="/" component={Dashboard || WelcomeScreen} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export const Menu = (props) => {
  // props = { text, path, icon, children }
  const {
    components: { Menu: MenuComponent },
  } = useAdmin();

  return <MenuComponent {...props} />;
};

export const Admin = ({
  routes = [],
  menus = [],
  components = {},
  clients = {},
  providers = [],
}) => {
  const [state, setState] = useState({
    components,
    clients,
    routes,
    menus: [...menus, <Menu text={"Dashboard"} path={"/"} />],
  });

  const addMenu = useCallback((...menus) => {
    setState((state) => {
      return {
        ...state,
        menus: [...state.menus, ...menus],
      };
    });
  }, []);

  const addRoute = useCallback((route) => {
    setState((state) => {
      return {
        ...state,
        routes: [...state.routes, route],
      };
    });
  }, []);

  const adminContext = useMemo(
    () => ({
      ...state,
      addMenu,
      addRoute,
    }),
    [state]
  );

  const Router = useMemo(() => compose(...providers)(AdminRouter), [providers]);

  return (
    <AdminContext.Provider value={adminContext}>
      <Router routes={state.routes} />
    </AdminContext.Provider>
  );
};
