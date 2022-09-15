import logo from "./logo.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import {
  Redirect,
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Movies from "./pages/movies";
import Movie from "./pages/movie";
import AddMovie from "./pages/add-movie";
import AddDirector from "./pages/add-director";
import updateMovie from "./pages/update-movie";
import updateDirector from "./pages/update-director";
function App() {
  return (
    <div className=" mx-auto max-w-sm w-full">
       <Toaster position="top-right" />
      <Router>
      <Switch>
        <Redirect exact from="/" to="/movies" />
        <Route path="/movies" component={Movies} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="/add-movie" component={AddMovie} />
        <Route path="/add-director" component={AddDirector} />
        <Route path="/update-movie/:id" component={updateMovie} />
        <Route path="/update-director" component={updateDirector} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
