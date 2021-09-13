import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Board } from './features/board/Board'
// import { TicketExpanded } from './features/ticket/TicketExpanded';
import './App.css';

import { Spin, Space, Modal } from 'antd';


const TicketExpandedModal = lazy(() => import('./features/ticket/TicketExpanded'));

const Spinner = () => {
  return (
    <Modal title="Basic Modal" visible={true}>
      <Space>
        <Spin size="large" />
      </Space>
    </Modal>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Board />
            <Switch>
              <Route path="/ticket/:id">
                <Suspense fallback={<Spinner/> }>
                  <TicketExpandedModal />
                </Suspense>
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
