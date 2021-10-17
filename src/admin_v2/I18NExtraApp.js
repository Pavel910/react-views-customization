import { Route, Switch, /*useRouteMatch*/ } from "react-router";
// import { Link } from "react-router-dom";
import { useAdmin } from "./Admin";

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

// const CustomNavigation = () => {
//   const { menus } = useAdmin();
//   const { path } = useRouteMatch();
//
//   return (
//     <ol>
//       {menus.map((menu) => (
//         <li key={menu.text}>
//           <Link to={menu.link}>{path === menu.link ? "> " : null}{menu.text}</Link>
//         </li>
//       ))}
//     </ol>
//   );
// };

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
      { text: "Locale Settings", link: "/i18n/settings" },
    ];

    const components = {
      ...props.components,
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
