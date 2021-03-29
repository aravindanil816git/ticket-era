import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Board } from './features/board/Board'
import { TicketExpanded } from './features/ticket/TicketExpanded';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
          <Board />
            <Switch>
              <Route path="/ticket/:id">
                <TicketExpanded />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
