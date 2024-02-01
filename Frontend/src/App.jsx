import { useEffect, useState } from 'react';
import axios from "axios";
import CreateTodo from './components/CreateTodo'
import Todo from './components/Todo';


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //every 10 sec data fetch.
    setInterval(() => {
      axios.get("http://localhost:3000/todos", { withCredentials: true })
        .then((response) => {
          setTodos(response.data);
        });
    }, 10000)

  }, [])


  return (
    <>
      <CreateTodo></CreateTodo>
      <ul>
        {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </ul>

    </>
  )
}

export default App
