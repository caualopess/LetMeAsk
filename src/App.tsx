//import { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from './pages/Room';
import { Home } from './pages/Home';
import { NewRoom } from "./pages/NewRoom";
//import { auth, firebase } from './services/firebase';

import { AuthContextProvider } from './contexts/AuthContexts';
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path ="/" exact component={Home} />
          <Route path ="/rooms/new" component={NewRoom}></Route>
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
