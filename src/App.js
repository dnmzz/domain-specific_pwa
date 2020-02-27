import React from 'react';
import './App.css';
// import NavBar from './components/Layout/Navbar';
import Home from './hoc/Home';
import DisplaysBuilder from './containers/DisplaysBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Home>
            <Route path="/" component={DisplaysBuilder} exact />
          </Home>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
