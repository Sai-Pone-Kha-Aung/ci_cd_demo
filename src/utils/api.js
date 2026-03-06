/**
 * API utility — wraps fetch for JSON endpoints.
 * Easy to mock in tests via vi.fn() or MSW.
 */

const BASE_URL = '/api'

export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}/todos`)
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return res.json()
}

export async function createTodo(text) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
  return res.json()
}
