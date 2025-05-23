"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

function TaskItem({ task, onDelete, updateTask, formatDate }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const menuRef = useRef(null)
  const statusDropdownRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "low":
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium transition-all duration-300">
            Low Priority
          </span>
        )
      case "medium":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium transition-all duration-300">
            Medium Priority
          </span>
        )
      case "high":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium transition-all duration-300">
            High Priority
          </span>
        )
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium transition-all duration-300">
            Medium Priority
          </span>
        )
    }
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "to-do":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-all duration-300">
            To Do
          </span>
        )
      case "in-progress":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium transition-all duration-300">
            In Progress
          </span>
        )
      case "done":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium transition-all duration-300">
            Done
          </span>
        )
      default:
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-all duration-300">
            To Do
          </span>
        )
    }
  }

  const changeStatus = (newStatus) => {
    updateTask({ ...task, status: newStatus })
    setShowStatusDropdown(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>{getPriorityBadge(task.priority)}</div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            aria-label="Task options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
              <div className="py-1">
                <Link
                  to={`/edit/${task.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Task
                  </div>
                </Link>
                <button
                  onClick={() => onDelete(task.id)}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Task
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-800">{task.title}</h3>
      {task.description && <p className="text-gray-600 mb-4 text-sm">{task.description}</p>}

      <div className="flex justify-between items-center mt-4">
        <div>{getStatusBadge(task.status)}</div>
        <div className="text-xs text-gray-500">Created: {formatDate(task.createdAt)}</div>
      </div>

      <div className="relative mt-4" ref={statusDropdownRef}>
        <button
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Change Status
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-2 text-gray-500 transition-transform duration-300 ${
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
          <div className="absolute inset-x-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
            <div className="py-1">
              <button
                onClick={() => changeStatus("to-do")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                  task.status === "to-do" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  To Do
                </div>
              </button>
              <button
                onClick={() => changeStatus("in-progress")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                  task.status === "in-progress" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  In Progress
                </div>
              </button>
              <button
                onClick={() => changeStatus("done")}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                  task.status === "done" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  Done
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskItem
