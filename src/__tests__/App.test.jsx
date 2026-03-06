// ============================================================
// INTEGRATION TESTS — App.jsx
// Tests: both sub-components render, cross-component independence
// (e.g. counter state does not reset when a todo is added)
// ============================================================
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App — Integration Tests', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /react testing demo/i })).toBeInTheDocument()
  })

  it('renders both the Counter and TodoList sections', () => {
    render(<App />)
    expect(screen.getByTestId('counter')).toBeInTheDocument()
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  })

  it('Counter and TodoList work independently: counter state is preserved after adding a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Increment the counter 3 times
    const incrementBtn = screen.getByRole('button', { name: /\+/ })
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    expect(screen.getByTestId('count-display')).toHaveTextContent('3')

    // Add a todo
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'Does not reset counter')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Counter should still read 3
    expect(screen.getByTestId('count-display')).toHaveTextContent('3')
    // Todo should appear
    expect(screen.getByText('Does not reset counter')).toBeInTheDocument()
  })

  it('can interact with both components in the same test without interference', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add a couple of todos
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'Task A')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'Task B')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Increment counter
    await user.click(screen.getByRole('button', { name: /\+/ }))

    // Assert both states are correct simultaneously
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByTestId('count-display')).toHaveTextContent('1')
  })
})
