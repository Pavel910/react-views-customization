import {cloneElement, useEffect} from "react";
import { Route, Switch } from "react-router";
import { useAdmin } from "./Admin";

const LocalesList = () => {
  return <div>Locales list</div>;
};

export const createI18NApp = () => {
  const I18NApp = ({ routes, menus }) => {
    const { components, addRoute, addMenu } = useAdmin();
    const { Layout } = components;

    useEffect(() => {
      // Add application routes
      addRoute(
          <Route path={"/i18n"}>
            <Switch>
              <Route
                  path={`/i18n/locales`}
                  component={Layout.with(LocalesList)}
              />
              {routes.map(route => cloneElement(route))}
            </Switch>
          </Route>
      );

      // Add application menus
      [{ text: "Locales", link: "/i18n/locales" }, ...menus].forEach(addMenu);
    }, []);

    return null;
  };

  return I18NApp;
};
