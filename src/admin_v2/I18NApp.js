import React, { createContext, useContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import { Menu, useAdmin } from "./Admin";

// Create a context and a hook to consume it
const I18NContext = createContext();
I18NContext.displayName = "I18NContext";
const useI18N = () => useContext(I18NContext);

// A traditional "CRUD List" view
const LocalesList = () => {
  const {
    components: { Layout },
  } = useAdmin();
  const { locales } = useI18N();

  return (
    <Layout>
      <h2>Locales List</h2>
      <ul>
        {locales.map(({ code }) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </Layout>
  );
};

// This is the HOC to "register" the app
export const withI18N = () => (Component) => {
  const withI18nProvider =
    (Component) =>
    ({ children, ...props }) => {
      const {
        addMenu,
        addRoute,
        components: { Layout },
      } = useAdmin();

      useEffect(() => {
        setTimeout(() => {
          addMenu(
            <Menu text={"Dynamic Content"}>
              <Menu text={"Dynamic #1"} path={"/cms/dynamic/1"} />
              <Menu text={"Dynamic #2"} path={"/cms/dynamic/2"} />
            </Menu>
          );
          addRoute(
            <Route path={"/cms"}>
              <Switch>
                <Route path={"/cms/dynamic/1"}>
                  <Layout>
                    <h2>Dynamic Route 1</h2>
                  </Layout>
                </Route>
                <Route path={"/cms/dynamic/2"}>
                  <Layout>
                    <h2>Dynamic Route 2</h2>
                  </Layout>
                </Route>
              </Switch>
            </Route>
          );
        }, 2000);
      }, []);

      return (
        <I18NContext.Provider value={{ locales: [{ code: "en-US" }] }}>
          <Component {...props}>{children}</Component>
        </I18NContext.Provider>
      );
    };

  const I18NApp = ({ children, ...props }) => {
    // Assign app routes
    const routes = [
      ...(props.routes || []),
      <Route path={"/i18n"}>
        <Switch>
          <Route path={`/i18n/locales`} component={LocalesList} />
        </Switch>
      </Route>,
    ];

    // Assign app menus (should these be React components? Not sure.)
    const menus = [
      ...(props.menus || []),
      <Menu text={"Locales"} path={"/i18n/locales"} />,
    ];

    // Assign app context providers
    const providers = [...(props.providers || []), withI18nProvider];

    return (
      <Component {...props} routes={routes} menus={menus} providers={providers}>
        {children}
      </Component>
    );
  };

  return I18NApp;
};
