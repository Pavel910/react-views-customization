import React, { Children, cloneElement } from "react";
import { Route, Switch, useRouteMatch /*useRouteMatch*/ } from "react-router";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Menu, useAdmin } from "./Admin";

const Settings = () => {
  const {
    components: { Layout },
  } = useAdmin();
  return (
    <Layout>
      <h2>Locales Settings</h2>
    </Layout>
  );
};

// const CustomLayout = ({ children }) => {
//   const {
//     components: { Navigation },
//   } = useAdmin();
//   return (
//     <div>
//       <nav>Custom Layout</nav>
//       <div style={{ display: "flex" }}>
//         <div style={{ flexBasis: 200 }}>
//           <nav>Navigation 1</nav>
//           <Navigation />
//         </div>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };

const CustomNavigation = ({ menus }) => {
  const sorted = menus.sort((a, b) => {
    return a.props.text.localeCompare(b.props.text);
  });

  return (
    <ol>{sorted.map((menu, index) => cloneElement(menu, { key: index }))}</ol>
  );
};

const CustomMenu = ({ text, path, children }) => {
  const match = useRouteMatch();
  const menus = Children.toArray(children);
  return (
    <li>
      {path ? (
        <Link to={path}>
          {match.path === path ? "> " : null}
          {text}
        </Link>
      ) : (
        text
      )}
      {children ? (
        <ul>
          {menus.map((menu, index) => cloneElement(menu, { key: index }))}
        </ul>
      ) : null}
    </li>
  );
};

export const withI18NExtra = () => (Component) => {
  const I18NExtraApp = ({ children, ...props }) => {
    const routes = [
      ...(props.routes || []),
      <Route path={"/i18n"}>
        <Switch>
          <Route path={`/i18n/settings`} component={Settings} />
        </Switch>
      </Route>,
    ];

    const menus = [
      ...(props.menus || []),
      <Menu text={"Locale Settings"} path={"/i18n/settings"} />,
    ];

    const components = {
      ...props.components,
      // Menu: CustomMenu,
      // Layout: CustomLayout,
      // Navigation: CustomNavigation,
    };

    return (
      <Component
        {...props}
        routes={routes}
        menus={menus}
        components={components}
      >
        {children}
      </Component>
    );
  };
  return I18NExtraApp;
};
