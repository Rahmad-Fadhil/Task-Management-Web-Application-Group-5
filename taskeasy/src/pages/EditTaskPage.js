"use client"

import { useParams, Navigate } from "react-router-dom"
import TaskForm from "../components/TaskForm"

function EditTaskPage({ onSubmit, getTaskById }) {
  const { taskId } = useParams()
  const task = getTaskById(taskId)

  // If task not found, redirect to home page
  if (!task) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h1>
      <TaskForm onSubmit={onSubmit} initialTask={task} isEditing={true} />
    </div>
  )
}

export default EditTaskPage