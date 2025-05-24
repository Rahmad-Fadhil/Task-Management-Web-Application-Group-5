"use client"

 import { useState, useEffect } from "react"
 import { Routes, Route, useNavigate } from "react-router-dom"
 import Header from "./components/Header"
 import TaskList from "./components/TaskList"
 import AddTaskPage from "./pages/AddTaskPage"
 import EditTaskPage from "./pages/EditTaskPage"

 const LOCAL_STORAGE_KEY = "taskEasyTasks"

 function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
    navigate("/")
  }

  const updateTask = (updatedTask) => {
    // Update state
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
      
      // Langsung update localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks))
      
      return updatedTasks
    })
    navigate("/")
  }

  const getTaskById = (id) => {
    // Ambil data terbaru dari localStorage untuk memastikan konsistensi
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    const currentTasks = storedTasks ? JSON.parse(storedTasks) : []
    
    return currentTasks.find((task) => task.id === id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} updateTask={updateTask}/>} />
          <Route path="/add" element={<AddTaskPage onSubmit={addTask} />} />
          <Route path="/edit/:taskId" element={<EditTaskPage onSubmit={updateTask} getTaskById={getTaskById} />} />
        </Routes>
      </main>
    </div>
  )
 }

 export default App