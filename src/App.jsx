import { useEffect, useState } from "react"
import { Todoprovider } from "./Context"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id : Date.now(), ...todos}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachval) => {
      if (eachval.id === id) {
        todo
      } else {
        eachval
      }
    }))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }


  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ?
      { ...prevTodo, completed: !prevTodo.completed } :
      prevTodo))
  }
    
  useEffect(() => {
  try {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(storedTodos)) {
      setTodos(storedTodos);
    }
  } catch (error) {
    console.error("Error loading todos:", error);
  }
}, []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify)
  }, [todos])
  
  return (
    <Todoprovider value={{addTodo, todos, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}
export default App