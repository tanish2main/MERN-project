import React, { useState, useEffect } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch the todos when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          method: "GET"
        });
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos(); // Call the function to fetch todos when the component mounts

    // Use setInterval to periodically fetch todos
    const interval = setInterval(fetchTodos, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
