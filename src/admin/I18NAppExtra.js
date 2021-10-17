import { Route } from "react-router";
import { useAdmin } from "./Admin";

const Settings = () => {
  return <div>Locales Settings</div>;
};

export const extraStuff = (I18NApp) => () => {
  const { components } = useAdmin();
  const { Layout } = components;
  return (
    <I18NApp
      routes={[
        <Route path={`/i18n/settings`} component={Layout.with(Settings)} />,
      ]}
      menus={[{ text: "Locale Settings", link: "/i18n/settings" }]}
    />
  );
};
