import React from 'react';
import './App.css';
import Home from './hoc/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Home />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
