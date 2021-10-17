import { Link } from "react-router-dom";
import { createI18NApp } from "./I18NApp";
import { extraStuff } from "./I18NAppExtra";
import { Admin, useAdmin } from "./Admin";

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <Link to={"/random-route"}>Take me somewhere</Link>
    </>
  );
};

const NotFound = () => {
  return (
    <div>
      <h2>NotFound</h2>
    </div>
  );
};

const Navigation = () => {
  const { menus } = useAdmin();

  return (
    <ul>
      {menus.map((menu) => (
        <li key={menu.text}>
          <Link to={menu.link}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const Layout = ({ children, Menu = Navigation}) => {
  return (
    <div>
      <nav>Layout</nav>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: 200 }}>
          <Menu />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

Layout.with = (Component) => () =>
  (
    <Layout>
      <Component />
    </Layout>
  );

// Customizations
const I18NApp = extraStuff(createI18NApp());

const CustomMenu = () => {
  const { menus } = useAdmin();

  return (
    <div>
      <div>Custom Menu</div>
      <ol>
        {menus.map((menu) => (
          <li key={menu.text}>
            <Link to={menu.link}>{menu.text}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

const CustomLayout = (props) => {
  return <Layout Menu={CustomMenu} {...props}/>;
};

CustomLayout.with = (Component) => () =>
  (
    <CustomLayout>
      <Component />
    </CustomLayout>
  );

export const App = () => {
  return (
    <Admin
      dashboard={CustomLayout.with(Dashboard)}
      layout={CustomLayout}
      catchAll={NotFound}
    >
      <I18NApp />
    </Admin>
  );
};
