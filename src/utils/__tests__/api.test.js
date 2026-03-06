// ============================================================
// UNIT TESTS — api.js
// Tests: successful fetch, HTTP error, correct endpoint called
// Uses vi.stubGlobal to mock the global fetch
// ============================================================
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchTodos, createTodo } from '../../utils/api'

const MOCK_TODOS = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Write tests', completed: true },
]

function mockFetch(data, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(data),
  })
}

describe('api.js — Unit Tests', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch(MOCK_TODOS))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('fetchTodos()', () => {
    it('calls fetch with the correct URL', async () => {
      await fetchTodos()
      expect(fetch).toHaveBeenCalledWith('/api/todos')
    })

    it('returns parsed JSON on success', async () => {
      const data = await fetchTodos()
      expect(data).toEqual(MOCK_TODOS)
    })

    it('throws an error when response is not ok', async () => {
      vi.stubGlobal('fetch', mockFetch(null, false, 500))
      await expect(fetchTodos()).rejects.toThrow('HTTP error: 500')
    })
  })

  describe('createTodo()', () => {
    it('calls fetch with POST method and JSON body', async () => {
      vi.stubGlobal('fetch', mockFetch({ id: 3, text: 'New todo', completed: false }))
      await createTodo('New todo')

      expect(fetch).toHaveBeenCalledWith('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'New todo' }),
      })
    })

    it('returns the created todo on success', async () => {
      const newTodo = { id: 3, text: 'New todo', completed: false }
      vi.stubGlobal('fetch', mockFetch(newTodo))

      const result = await createTodo('New todo')
      expect(result).toEqual(newTodo)
    })

    it('throws an error when creation fails (404)', async () => {
      vi.stubGlobal('fetch', mockFetch(null, false, 404))
      await expect(createTodo('Bad todo')).rejects.toThrow('HTTP error: 404')
    })
  })
})
