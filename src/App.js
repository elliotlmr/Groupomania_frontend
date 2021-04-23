import "./App.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Logs from "./pages/Logs/Logs";
import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import { createBrowserHistory } from "history";
import Parameters from "./pages/Parameters/Parameters";

const history = createBrowserHistory();

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Logs} path="/" exact />
        <PublicRoute restricted={true} component={Logs} path="/signup" exact />
        <PrivateRoute component={Homepage} path="/home" exact />
        <PrivateRoute component={Profile} path="/profile" strict />
        <PrivateRoute component={Parameters} path="/parameters" exact />
      </Switch>
    </Router>
  );
}

export default App;
