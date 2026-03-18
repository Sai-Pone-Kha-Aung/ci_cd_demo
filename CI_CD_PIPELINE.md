# CI/CD Pipeline & Testing Strategy

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for **ci_cd_demo**, a React + Vite application.

---

## Pipeline Overview

The pipeline is triggered on every **push** or **pull request** to the `main` branch and runs four parallel jobs before deployment.

```mermaid
flowchart TD
    A([🚀 Developer Push / Pull Request]) --> B{Target Branch: main?}
    B -->|No| Z([⏭️ Pipeline Skipped])
    B -->|Yes| C[📥 Checkout Code]

    C --> D[🔍 Lint Job]
    C --> E[🧪 Unit & Integration Test Job]
    C --> F[🎭 E2E Test Job]

    D --> D1[Setup Node.js 20.x]
    D1 --> D2[npm ci]
    D2 --> D3[npm run lint — ESLint]
    D3 --> D4{Lint Passed?}

    E --> E1[Setup Node.js 20.x]
    E1 --> E2[npm ci]
    E2 --> E3[npm run build]
    E3 --> E4[npm run coverage — Vitest]
    E4 --> E5[📦 Upload Coverage Report\nRetained 7 days]
    E5 --> E6{Tests Passed?}

    F --> F1[Setup Node.js 20.x]
    F1 --> F2[npm ci]
    F2 --> F3[Install Playwright Chromium]
    F3 --> F4[npm run test:e2e — Playwright]
    F4 --> F5[📦 Upload Playwright Report\nRetained 7 days — always]
    F5 --> F6{E2E Passed?}

    D4 -->|❌ Fail| FAIL([🚫 Pipeline Failed])
    E6 -->|❌ Fail| FAIL
    F6 -->|❌ Fail| FAIL

    D4 -->|✅ Pass| GATE{All Jobs Passed\n+ Push to main?}
    E6 -->|✅ Pass| GATE
    F6 -->|✅ Pass| GATE

    GATE -->|No — PR only| SUCCESS([✅ CI Passed — No Deploy])
    GATE -->|Yes| G[🚀 Deploy Job]

    G --> G1[Setup Node.js 20.x]
    G1 --> G2[npm ci]
    G2 --> G3[npx vercel --prod\nusing VERCEL_TOKEN secret]
    G3 --> DEPLOYED([🌐 Deployed to Vercel Production])

    style A fill:#4f46e5,color:#fff,stroke:none
    style DEPLOYED fill:#16a34a,color:#fff,stroke:none
    style FAIL fill:#dc2626,color:#fff,stroke:none
    style SUCCESS fill:#0891b2,color:#fff,stroke:none
    style Z fill:#6b7280,color:#fff,stroke:none
    style GATE fill:#d97706,color:#fff,stroke:none
```

---

## Testing Layers

```mermaid
flowchart LR
    subgraph T1["🔬 Unit & Integration Tests — Vitest"]
        U1[Component Logic Tests]
        U2[Hook Tests]
        U3[Utility Function Tests]
        U4[Coverage Report]
        U1 --> U4
        U2 --> U4
        U3 --> U4
    end

    subgraph T2["🎭 End-to-End Tests — Playwright"]
        P1[Browser: Chromium]
        P2[User Flow Simulations]
        P3[UI Assertion Tests]
        P4[Playwright HTML Report]
        P1 --> P2 --> P3 --> P4
    end

    subgraph T3["🔍 Static Analysis — ESLint"]
        L1[Code Style Rules]
        L2[React Hooks Rules]
        L3[React Refresh Rules]
    end

    SRC([📁 Source Code]) --> T1
    SRC --> T2
    SRC --> T3
```

---

## Tools & Technologies

| Layer            | Tool                          | Command               | Artifact Uploaded       |
|------------------|-------------------------------|-----------------------|-------------------------|
| Linting          | ESLint 9                      | `npm run lint`        | —                       |
| Unit Tests       | Vitest + Testing Library      | `npm run coverage`    | `coverage/` (7 days)    |
| E2E Tests        | Playwright (Chromium)         | `npm run test:e2e`    | `playwright-report/` (7 days) |
| Build            | Vite 7                        | `npm run build`       | —                       |
| Deployment       | Vercel CLI                    | `npx vercel --prod`   | —                       |
| CI Runner        | GitHub Actions (ubuntu-latest)| —                     | —                       |
| Runtime          | Node.js 20.x                  | —                     | —                       |

---

## Job Dependency Graph

```mermaid
graph LR
    L[🔍 Lint] --> D[🚀 Deploy]
    U[🧪 Unit & Integration Tests] --> D
    E[🎭 E2E Tests] --> D

    style L fill:#6366f1,color:#fff,stroke:none
    style U fill:#0891b2,color:#fff,stroke:none
    style E fill:#7c3aed,color:#fff,stroke:none
    style D fill:#16a34a,color:#fff,stroke:none
```

> **Deploy** only runs when **all three** jobs pass **and** the event is a push to `main`. Pull requests only run CI checks — no deploy.

---

## Trigger Rules

| Event               | Lint | Unit Tests | E2E Tests | Deploy |
|---------------------|:----:|:----------:|:---------:|:------:|
| Push → `main`       | ✅   | ✅         | ✅        | ✅     |
| PR → `main`         | ✅   | ✅         | ✅        | ❌     |
| Push → other branch | ❌   | ❌         | ❌        | ❌     |

---

## Secrets Required

| Secret Name          | Used By       | Purpose                        |
|----------------------|---------------|--------------------------------|
| `VERCEL_TOKEN`       | Deploy job    | Vercel CLI authentication      |
| `VERCEL_ORG_ID`      | Deploy job    | Identify Vercel organization   |
| `VERCEL_PROJECT_ID`  | Deploy job    | Identify Vercel project        |
