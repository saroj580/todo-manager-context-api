import { useEffect, useState } from "react"
import { Todoprovider } from "./Context"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id : Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };


  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }


  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ?
      { ...prevTodo, completed: !prevTodo.completed } :
      prevTodo))
  }
    
// useEffect(() => {
//   const storedTodos = localStorage.getItem("todos");
//   console.log("Stored Todos:", storedTodos);
//   if (storedTodos) {
//     setTodos(JSON.parse(storedTodos));
//   }
  // }, []);
  
  useEffect(() => {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    } else {
      console.log("No todos found in localStorage");
      setTodos([]); // Default to an empty array if no todos are found
    }
  } catch (error) {
    console.error("Error retrieving or parsing todos from localStorage:", error);
    setTodos([]); // Set to an empty array if parsing fails
  }
}, []);
  

// useEffect(() => {
//   console.log("Saving Todos:", todos);
//   localStorage.setItem("todos", JSON.stringify(todos));
// }, [todos]);

  
  useEffect(() => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Error saving todos to localStorage:", error);
  }
}, [todos]);

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