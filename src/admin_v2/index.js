import { compose } from "./compose";
import { Admin } from "./Admin";
import { withI18N } from "./I18NApp";
import { withI18NExtra } from "./I18NExtraApp";
import { Dashboard, NotFound, Layout, Navigation } from "./components";

const withGraphQL =
  ({ client }) =>
  (Component) => {
    const WithGraphQL = ({ children, ...props }) => {
      return (
        <Component
          {...props}
          clients={{ ...(props.clients || {}), default: client }}
        >
          {children}
        </Component>
      );
    };

    return WithGraphQL;
  };

const withComponents = (components) => (Component) => {
  const WithComponents = ({ children, ...props }) => {
    return (
      <Component
        {...props}
        components={{ ...(props.components || {}), ...components }}
      >
        {children}
      </Component>
    );
  };

  return WithComponents;
};

// Compose an application
export const App = compose(
  // // Define default components
  // withComponents({ Dashboard, NotFound, Layout, Navigation }),
  // // Add a GraphQL client
  // withGraphQL({
  //   client: "default apollo client",
  // }),
  // // Setup I18N app
  // withI18N(),
  // // Setup some I18N extras
  // withI18NExtra()
)(Admin);
