// ============================================================
// UNIT TESTS — Button.jsx
// Tests: render, click handler, disabled state
// ============================================================

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button — Unit Tests', () => {
  it('renders its children as the label', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Submit</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    )
    await user.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies the correct variant class', () => {
    render(<Button variant="secondary">Sec</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')
  })

  it('defaults to primary variant', () => {
    render(<Button>Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })
})
