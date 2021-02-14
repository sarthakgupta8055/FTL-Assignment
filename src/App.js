import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Components/Home';
import CalendarView from './Components/CalendarView';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  return (
    <div className="container-fluid App bg-white">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Calendar" component={CalendarView}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
