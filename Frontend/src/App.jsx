import { useEffect, useState } from 'react'
import CreateTodo from './components/CreateTodo'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const response = axios.get("http://localhost:3000/todos");
    setTodos(response.data);
  }, []);

  return (
    <>
      <h1>Hey there</h1>
      <CreateTodo></CreateTodo>
      <ul>
        {todos.map((todo, index) => <li key={index + 1} id={index + 1}>{todo}</li>)}
      </ul>
    </>
  )
}

export default App
