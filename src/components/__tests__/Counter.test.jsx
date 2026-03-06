// ============================================================
// UNIT TESTS — Counter.jsx
// Tests: initial value, increment, decrement, reset, floor at 0
// ============================================================
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../Counter'

function setup(props = {}) {
  const user = userEvent.setup()
  render(<Counter {...props} />)
  return {
    user,
    getCount: () => screen.getByTestId('count-display').textContent,
    increment: () => user.click(screen.getByRole('button', { name: /\+/ })),
    decrement: () => user.click(screen.getByRole('button', { name: /−/ })),
    reset: () => user.click(screen.getByRole('button', { name: /reset/i })),
  }
}

describe('Counter — Unit Tests', () => {
  it('renders the initial value (default 0)', () => {
    const { getCount } = setup()
    expect(getCount()).toBe('0')
  })

  it('renders the given initialValue', () => {
    const { getCount } = setup({ initialValue: 5 })
    expect(getCount()).toBe('5')
  })

  it('increments the count by 1 on each click', async () => {
    const { increment, getCount } = setup()
    await increment()
    expect(getCount()).toBe('1')
    await increment()
    expect(getCount()).toBe('2')
  })

  it('decrements the count by 1 on each click', async () => {
    const { increment, decrement, getCount } = setup()
    await increment()
    await increment()
    await decrement()
    expect(getCount()).toBe('1')
  })

  it('does not go below 0', async () => {
    const { decrement, getCount } = setup()
    // Count is already at 0 — decrement button should be disabled
    const decrementBtn = screen.getByRole('button', { name: /−/ })
    expect(decrementBtn).toBeDisabled()
    await decrement()
    expect(getCount()).toBe('0')
  })

  it('resets to the initial value', async () => {
    const { increment, reset, getCount } = setup({ initialValue: 2 })
    await increment()
    await increment()
    expect(getCount()).toBe('4')
    await reset()
    expect(getCount()).toBe('2')
  })
})
