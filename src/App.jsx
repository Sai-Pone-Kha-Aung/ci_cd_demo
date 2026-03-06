import Counter from './components/Counter'
import TodoList from './components/TodoList'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Testing Demo</h1>
        <p className="subtitle">Unit · Integration · E2E</p>
      </header>
      <main className="app-main">
        <Counter initialValue={0} />
        <TodoList />
      </main>
    </div>
  )
}
