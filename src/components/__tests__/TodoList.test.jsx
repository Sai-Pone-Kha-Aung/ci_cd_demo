// ============================================================
// INTEGRATION TESTS — TodoList.jsx
// Tests full user workflows: adding, toggling, deleting todos
// These test multiple units working together (input + state + render)
// ============================================================
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../TodoList'

async function setup() {
  const user = userEvent.setup()
  render(<TodoList />)
  return { user }
}

async function addTodo(user, text) {
  await user.type(screen.getByRole('textbox', { name: /new todo/i }), text)
  await user.click(screen.getByRole('button', { name: /add/i }))
}

describe('TodoList — Integration Tests', () => {
  it('shows an empty-state message when no todos exist', async () => {
    await setup()
    expect(screen.getByTestId('empty-msg')).toBeInTheDocument()
  })

  it('user can type and add a todo', async () => {
    const { user } = await setup()
    await addTodo(user, 'Buy milk')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-msg')).not.toBeInTheDocument()
  })

  it('clears the input after adding a todo', async () => {
    const { user } = await setup()
    await addTodo(user, 'Write tests')

    expect(screen.getByRole('textbox', { name: /new todo/i })).toHaveValue('')
  })

  it('user can add multiple todos', async () => {
    const { user } = await setup()
    await addTodo(user, 'First task')
    await addTodo(user, 'Second task')

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(screen.getByText('First task')).toBeInTheDocument()
    expect(screen.getByText('Second task')).toBeInTheDocument()
  })

  it('shows error when trying to add an empty todo', async () => {
    const { user } = await setup()
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter/i)
  })

  it('pressing Enter also adds a todo', async () => {
    const { user } = await setup()
    await user.type(screen.getByRole('textbox', { name: /new todo/i }), 'Via Enter{Enter}')

    expect(screen.getByText('Via Enter')).toBeInTheDocument()
  })

  it('user can toggle a todo to completed', async () => {
    const { user } = await setup()
    await addTodo(user, 'Toggle me')

    const checkbox = screen.getByRole('checkbox', { name: /toggle: toggle me/i })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    // The li should now have the 'completed' class
    expect(checkbox.closest('li')).toHaveClass('completed')
  })

  it('user can toggle a todo back to incomplete', async () => {
    const { user } = await setup()
    await addTodo(user, 'Toggle back')

    const checkbox = screen.getByRole('checkbox', { name: /toggle: toggle back/i })
    await user.click(checkbox) // complete
    await user.click(checkbox) // uncomplete

    expect(checkbox).not.toBeChecked()
    expect(checkbox.closest('li')).not.toHaveClass('completed')
  })

  it('user can delete a todo', async () => {
    const { user } = await setup()
    await addTodo(user, 'Delete me')

    expect(screen.getByText('Delete me')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /delete: delete me/i }))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
    expect(screen.getByTestId('empty-msg')).toBeInTheDocument()
  })

  it('deleting one todo leaves the others intact', async () => {
    const { user } = await setup()
    await addTodo(user, 'Keep me')
    await addTodo(user, 'Remove me')

    await user.click(screen.getByRole('button', { name: /delete: remove me/i }))

    expect(screen.getByText('Keep me')).toBeInTheDocument()
    expect(screen.queryByText('Remove me')).not.toBeInTheDocument()
  })
})
