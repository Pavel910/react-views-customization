import { Link } from "react-router-dom";
import { useAdmin } from "./Admin";

export const Dashboard = () => {
  const {
    components: { Layout },
  } = useAdmin();
  return (
    <Layout>
      <h2>Dashboard</h2>
      <Link to={"/random-route"}>Take me somewhere</Link>
    </Layout>
  );
};

export const NotFound = () => {
  const {
    components: { Layout },
  } = useAdmin();

  return (
    <Layout>
      <h2>NotFound</h2>
    </Layout>
  );
};

export const Navigation = () => {
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

export const Layout = ({ children }) => {
  const {
    components: { Navigation },
  } = useAdmin();
  return (
    <div>
      <nav>Layout</nav>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: 200 }}>
          <Navigation />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
