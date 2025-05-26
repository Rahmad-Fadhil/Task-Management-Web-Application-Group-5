"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import TaskItem from "./TaskItem"

function TaskList({ tasks, deleteTask, updateTask }) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("high-to-low")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const statusDropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : []

  const filteredTasks = safeTasks.filter((task) => {
    if (statusFilter === "all") return true
    return task.status === statusFilter
  })

  const getSortedTasks = () => {
    try {
      const priorityOrder = { high: 0, medium: 1, low: 2 }

      // Create a safe copy to sort
      const tasksCopy = Array.from(filteredTasks)

      return tasksCopy.sort((a, b) => {
        if (sortOrder === "high-to-low") {
          return priorityOrder[a?.priority || "medium"] - priorityOrder[b?.priority || "medium"]
        } else {
          return priorityOrder[b?.priority || "medium"] - priorityOrder[a?.priority || "medium"]
        }
      })
    } catch (error) {
      return filteredTasks
    }
  }

  const sortedTasks = getSortedTasks()

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const options = { year: "numeric", month: "long", day: "numeric" }
      return date.toLocaleDateString(undefined, options)
    } catch (e) {
      return "Invalid date"
    }
  }

  const getStatusLabel = () => {
    switch (statusFilter) {
      case "to-do":
        return "To Do"
      case "in-progress":
        return "In Progress"
      case "done":
        return "Done"
      default:
        return "All Statuses"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <div className="flex space-x-3">
          <div className="relative" ref={statusDropdownRef}>
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>{getStatusLabel()}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ml-2 text-gray-500 transition-transform duration-300 ${
                  showStatusDropdown ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 animate-fadeIn">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setStatusFilter("all")
                      setShowStatusDropdown(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                      statusFilter === "all" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    All Statuses
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("to-do")
                      setShowStatusDropdown(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                      statusFilter === "to-do" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    To Do
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("in-progress")
                      setShowStatusDropdown(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                      statusFilter === "in-progress" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("done")
                      setShowStatusDropdown(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                      statusFilter === "done" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "high-to-low" ? "low-to-high" : "high-to-low")}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Priority: {sortOrder === "high-to-low" ? "High to Low" : "Low to High"}
          </button>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">No tasks yet.</p>
          <Link
            to="/add"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-sm"
          >
            Create your first task
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id || Date.now()}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
