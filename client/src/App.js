import { gql, useQuery } from "@apollo/client";
import logo from "./logo.svg";
import "./App.css";

/**
 * @type {typeof import("./graphql.gen").DummyDocument}
 */
const dummy = gql`
  query dummy {
    whoAmI {
      id
      email
      role
    }
  }
`;

function App() {
  const query = useQuery(dummy);

  return (
    <div className="App">
      {query.loading ? "Loading..." : query.data?.whoAmI?.email ?? "User null"}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
