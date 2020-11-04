import Axios from "axios";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/Login";
import Board from "./component/Board/Board";
import Card from "./component/Card/Card";
import User from "./component/User/User";

Axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Board}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/profile" component={User}></Route>
          <Route path="/board/:boardId" component={Card}></Route>
          <Redirect from="*" to="/"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
