import React, { createContext, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './component/HomePage';
import Navbar from './component/Navbar';
import reducer from './component/reducer';
import Item from './component/Item';
import AddToDo from './component/Add-Page';
import EditToDo from './component/Edit-Page';
import axios from 'axios';

const toDoContext = createContext(null);
export { toDoContext };

function App() {

  const toDoList = []

  const [state, dispatch] = useReducer(reducer, toDoList)

  useEffect(() => {
    axios.get("https://todo-app-itachi.herokuapp.com/all-todo").then((res) => {
      dispatch({
        type: "ADD_FROM_API",
        payload: res.data
      })
    })
  }, [])

  return (
    <div >
      <Router>
        <Navbar />
        <toDoContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route path='/' exact={true}>
              <HomePage />
            </Route>
            <Route path='/add-todo' exact={true}>
              <AddToDo />
            </Route>
            <Route path='/edit-todo/:id' exact={true}>
              <EditToDo />
            </Route>
            <Route path='/:id' exact={true}>
              <Item />
            </Route>
          </Switch>
        </toDoContext.Provider>
      </Router>
    </div>
  );
}

export default App;
