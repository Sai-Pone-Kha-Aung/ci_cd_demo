# React Testing Demo — Unit, Integration, E2E & CI/CD

A React application demonstrating **unit testing**, **integration testing**, and **end-to-end (E2E) testing** with an automated CI/CD pipeline via GitHub Actions.

---

## 🚀 Getting Started

```bash
git clone https://github.com/y2k-dev/ci_cd.git
cd ci_cd
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

---

## 🧪 Testing

### Unit Tests — Vitest + React Testing Library

Unit tests verify individual components in isolation (e.g. `Button`, `Counter`, `TodoList`).

```bash
npm run test:run      # run once
npm run test          # watch mode
npm run coverage      # run with coverage report
```

Test files: `src/components/__tests__/`

### Integration Tests — Vitest + React Testing Library

Integration tests verify that multiple components work together correctly (e.g. Counter and TodoList do not interfere with each other when rendered inside `App`).

```bash
npm run test:run
```

Test files: `src/__tests__/App.test.jsx`

### E2E Tests — Playwright

E2E tests drive a real Chromium browser to simulate full user flows (page load, counter increment/decrement/reset, etc.).

```bash
npm run test:e2e

# Single test file
npx playwright test e2e/counter.spec.js
```

Test files: `e2e/`

### To run single test

```bash
npx vitest run Counter
npx vitest run App.test.jsx
npx vitest run counter.spec.js
```
---

## 📁 Project Structure

```
ci_cd/
├── .github/workflows/
│   └── github-actions.yml   # CI/CD pipeline
├── e2e/                     # Playwright E2E tests
│   ├── counter.spec.js
│   └── todos.spec.js
├── src/
│   ├── components/
│   │   ├── __tests__/       # Unit tests
│   │   │   ├── Button.test.jsx
│   │   │   ├── Counter.test.jsx
│   │   │   └── TodoList.test.jsx
│   │   ├── Button.jsx
│   │   ├── Counter.jsx
│   │   └── TodoList.jsx
│   ├── __tests__/           # Integration tests
│   │   └── App.test.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── playwright.config.js
```

---

## ⚙️ CI/CD — GitHub Actions

The pipeline (`.github/workflows/github-actions.yml`) runs automatically on every push and pull request to `main`. It has three parallel jobs:

| Job | Steps |
|-----|-------|
| **Lint** | Checkout → Setup Node 20 → Install deps → Run ESLint |
| **Unit & Integration Tests** | Checkout → Setup Node 20 → Install deps → Build → Run Vitest with coverage → Upload coverage artifact |
| **E2E Tests** | Checkout → Setup Node 20 → Install deps → Install Playwright browsers → Run Playwright tests → Upload Playwright report artifact |

---

## 🛠️ All NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |
| `npm run coverage` | Run Vitest with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |