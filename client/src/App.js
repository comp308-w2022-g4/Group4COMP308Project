import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import DailyINFOrm from "./pages/DailyINFOrm";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container mt-5 py-5">
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/DailyINFOrm">
            <DailyINFOrm />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <Profile />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </>
  );
}
