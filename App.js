import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "ACTIVE":
        return todos.filter((todo) => !todo.completed);
      case "COMPLETED":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("ACTIVE")}>Active</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
      </div>
      <ul>
        {filteredTodos().map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={deleteAllTodos}>Delete All</button>
    </div>
  );
}

export default App;
