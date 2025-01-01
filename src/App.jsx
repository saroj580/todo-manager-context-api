import { useEffect, useState } from "react"
import { Todoprovider } from "./Context"

function App() {
  const [todos, setTodos] = useState([])

  addTodo = (todo) => {
    setTodos((prev) => [{id : Date.now(), ...todos}, ...prev])
  }

  updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((eachval) => {
      if (eachval.id === id) {
        todo
      } else {
        eachval
      }
    }))
  }

  deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }


  toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo === id ?
      { ...prevTodo, completed: !prevTodo.completed } :
      prevTodo))
  }
    
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length) {
      setTodos(todos)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify)
  },[todos])
  return (
    <Todoprovider value={{addTodo, todos, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App