"use client"

import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import AddTaskPage from "./pages/AddTaskPage"

function App() {
  // Initialize with an empty array
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const addTask = (task) => {
    // Safely add a new task
    const safeTasksCopy = Array.isArray(tasks) ? [...tasks] : []

    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setTasks([...safeTasksCopy, newTask])
    navigate("/")
  }

  // Ensure we always pass an array to TaskList
  const safeTasks = Array.isArray(tasks) ? tasks : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Routes>
          <Route path="/" element={<TaskList tasks={safeTasks} />} />
          <Route path="/add" element={<AddTaskPage onSubmit={addTask} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
