"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function TaskForm({ onSubmit, initialTask, isEditing }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "to-do",
  })

  // If initialTask changes (editing mode), update the form
  useEffect(() => {
    if (initialTask) {
      setTask(initialTask)
    } else {
      // Reset form when not editing
      setTask({
        title: "",
        description: "",
        priority: "medium",
        status: "to-do",
      })
    }
  }, [initialTask])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.title.trim()) return

    onSubmit(task)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 transition-all duration-300 hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{isEditing ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            to="/"
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-sm"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
