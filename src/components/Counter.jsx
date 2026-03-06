import { useState } from 'react'
import Button from './Button'

export default function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => Math.max(0, c - 1))
  const reset = () => setCount(initialValue)

  return (
    <div className="counter" data-testid="counter">
      <h2>Counter</h2>
      <p className="count-display" data-testid="count-display">{count}</p>
      <div className="counter-controls">
        <Button onClick={decrement} disabled={count === 0} variant="secondary" data-testid="btn-decrement">
          −
        </Button>
        <Button style={{
          fontSize: '20px',
          width: '100px',
        }} onClick={reset} variant="secondary" data-testid="btn-reset">
          Reset
        </Button>
        <Button onClick={increment} data-testid="btn-increment">
          +
        </Button>
      </div>
    </div>
  )
}
