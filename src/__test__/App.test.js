import { render, screen, fireEvent } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"

// Mock confirm dialog
// global.confirm = jest.fn(() => true)

describe("Task Management", () => {
  beforeEach(() => {
    localStorage.clear()
    global.confirm = jest.fn(() => true)
  })

  test("can add a task", () => {
    const testTask = { title: "Test Task", description: "Test Desc" }

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    const addFn = container.querySelector("a[href='/add']")
    fireEvent.click(addFn)

    const titleInput = screen.getByPlaceholderText(/title/i)
    const descInput = screen.getByPlaceholderText(/description/i)
    const submitButton = screen.getByRole("button", { name: /add task/i })



    fireEvent.change(titleInput, { target: { value: testTask.title } })
    fireEvent.change(descInput, { target: { value: testTask.description } })
    fireEvent.click(submitButton)

    const savedTasks = JSON.parse(localStorage.getItem("taskEasyTasks"))
    expect(savedTasks.length).toBe(1)
    expect(savedTasks[0].title).toBe(testTask.title)
  })

  test("can update a task", () => {
    const existingTask = {
      id: "1",
      title: "Old Title",
      description: "Old Description",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("taskEasyTasks", JSON.stringify([existingTask]))

    const { container } = render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <App />
      </MemoryRouter>
    )

    const titleInput = screen.getByDisplayValue(/old title/i)
    const submitButton = screen.getByText(/update/i)

    fireEvent.change(titleInput, { target: { value: "New Title" } })
    fireEvent.click(submitButton)

    const updatedTasks = JSON.parse(localStorage.getItem("taskEasyTasks"))
    expect(updatedTasks[0].title).toBe("New Title")
  })

  test("can delete a task", () => {
    const taskToDelete = {
      id: "2",
      title: "keren",
      description: "To be deleted",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("taskEasyTasks", JSON.stringify([taskToDelete]))

    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    const menuButton = screen.getByLabelText("Task options")
    fireEvent.click(menuButton)

    const deleteButton = screen.getByTestId("delete-task")
    fireEvent.click(deleteButton)



    const remainingTasks = JSON.parse(localStorage.getItem("taskEasyTasks"))
    expect(remainingTasks.length).toBe(0)
  })
})
