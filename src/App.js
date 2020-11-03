import Axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/Login";
import Board from "./component/Board/Board";
import Card from "./component/Card/Card"

Axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Board}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/board/:boardId" component={Card}></Route>
      </Router>
    </div>
  );
}

export default App;
