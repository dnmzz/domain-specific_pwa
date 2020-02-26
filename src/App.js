import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import DisplaysBuilder from './containers/DisplaysBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={NavBar} exact />
        </Switch>
        {/* <DisplaysBuilder /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
