import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <Router>
      <div className="App">
        <TodoList />
      </div>
    </Router>
  );
}

export default App;
