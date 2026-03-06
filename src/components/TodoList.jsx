import { useState } from 'react'
import Button from './Button'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) {
      setError('Please enter a todo item.')
      return
    }
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ])
    setInput('')
    setError('')
  }

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div className="todo-list" data-testid="todo-list">
      <h2>Todo List</h2>

      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo…"
          aria-label="New todo"
          data-testid="todo-input"
        />
        <Button onClick={addTodo} data-testid="add-btn">Add</Button>
      </div>

      {error && (
        <p className="error" role="alert" data-testid="error-msg">
          {error}
        </p>
      )}

      {todos.length === 0 ? (
        <p className="empty-msg" data-testid="empty-msg">No todos yet. Add one above!</p>
      ) : (
        <ul data-testid="todo-items">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Toggle: ${todo.text}`}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete: ${todo.text}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
