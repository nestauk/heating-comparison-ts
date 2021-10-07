import logo from './logo.svg';
import './App.css';
import { calculateEquivalents } from './calculator';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <Link to="/ask">Ask</Link>
            </li>
            <li>
              <Link to="/input">Input</Link>
            </li>
            <li>
              <Link to="/estimate">Estimate</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/ask">
            <Input />
          </Route>
          <Route path="/input">
            <Input />
          </Route>
          <Route path="/estimate">
            <Estimate />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Start() {
  return (
    <div>
      <div className="App-header">
        Welcome
      </div>
      <div className="App-body">
        <p>Do you know how much carbon your home gas heating is producing?</p>
      </div>
    </div>
  );
}

function Ask() {
  return (
    <div>
      <div className="App-header">
        About you
      </div>
      <div className="App-body">
        <p>Do you know how much energy you currently use to heat your home?</p>
      </div>
    </div>
  );
}

function Input() {
  return <h2>Input</h2>;
}

function Estimate() {
  return (
    <div>
      <div className="App-header">
        Estimate your usage
      </div>
      <div className="body">
        <p>Do you know how much carbon your home gas heating is producing?</p>
      </div>
    </div>
  );
}


function Report() {
  const usage = 100;
  const data = calculateEquivalents(usage);
  console.log(`Data ${data}`);
  return (
    <div className="body">
      {data.equivalents.map(stat => {
        return (
          <div key={stat.name} >
            <p>
            {stat.name}
            {stat.desc}
            {stat.value}
            </p>
          </div>);
        })}
    </div>
  );
}





