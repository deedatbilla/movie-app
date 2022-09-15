import logo from "./logo.svg";
import "./App.css";
import {
  Redirect,
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Movies from "./pages/movies";
import Movie from "./pages/movie";
function App() {
  return (
    <div className=" mx-auto max-w-sm w-full">
      <Router>
      <Switch>
        <Redirect exact from="/" to="/movies" />
        <Route path="/movies" component={Movies} />
        <Route path="/movie/:id" component={Movie} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
