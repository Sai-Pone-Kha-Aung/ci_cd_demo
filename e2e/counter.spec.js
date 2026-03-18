// ============================================================
// E2E TESTS — Counter flow
// Uses Playwright to drive a real browser
// ============================================================
import { test, expect } from '@playwright/test'

test.describe('Counter — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/react testing demo/i)
  })

  test('counter starts at 0', async ({ page }) => {
    await expect(page.getByTestId('count-display')).toHaveText('0')
  })

  test('clicking + increments the counter', async ({ page }) => {
    const incrementBtn = page.getByRole('button', { name: '+' })
    await incrementBtn.click()
    await incrementBtn.click()
    await incrementBtn.click()
    await expect(page.getByTestId('count-display')).toHaveText('3')
  })

  test('clicking − decrements the counter', async ({ page }) => {
    const incrementBtn = page.getByRole('button', { name: '+' })
    await incrementBtn.click()
    await incrementBtn.click()
    await page.getByRole('button', { name: '−' }).click()
    await expect(page.getByTestId('count-display')).toHaveText('1')
  })

  test('− button is disabled at 0', async ({ page }) => {
    await expect(page.getByRole('button', { name: '−' })).toBeDisabled()
  })

  test('Reset button resets count to 0', async ({ page }) => {
    const incrementBtn = page.getByRole('button', { name: '+' })
    await incrementBtn.click()
    await incrementBtn.click()
    await page.getByRole('button', { name: /reset/i }).click()
    await expect(page.getByTestId('count-display')).toHaveText('0')
  })
})
