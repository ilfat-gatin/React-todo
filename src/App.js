import React from "react";
import { Header } from "./components/Header/header";
import { TodoList } from "./components/TodoList/todoList";
import classes from "./app.module.css"

function App() {

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Header />
        <TodoList />        
      </div>
    </div>  
  );
}

export default App;
