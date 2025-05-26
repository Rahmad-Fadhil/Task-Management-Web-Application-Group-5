"use client"

import TaskForm from "../components/TaskForm"

function AddTaskPage({ onSubmit }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h1>
      <TaskForm onSubmit={onSubmit} isEditing={false} />
    </div>
  )
}

export default AddTaskPage
