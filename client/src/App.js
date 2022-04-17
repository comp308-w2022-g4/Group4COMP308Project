import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container pt-5">
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </>
  );
}
