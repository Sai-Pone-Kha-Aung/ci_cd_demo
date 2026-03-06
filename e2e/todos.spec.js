// ============================================================
// E2E TESTS — TodoList flow
// Uses Playwright to drive a real browser
// ============================================================
import { test, expect } from '@playwright/test'

test.describe('TodoList — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows empty state message on first load', async ({ page }) => {
    await expect(page.getByTestId('empty-msg')).toBeVisible()
  })

  test('user can add a todo', async ({ page }) => {
    await page.getByLabel('New todo').fill('Buy groceries')
    await page.getByRole('button', { name: /add/i }).click()

    await expect(page.getByText('Buy groceries')).toBeVisible()
    await expect(page.getByTestId('empty-msg')).not.toBeVisible()
  })

  test('user can add multiple todos', async ({ page }) => {
    const input = page.getByLabel('New todo')

    await input.fill('Task one')
    await page.getByRole('button', { name: /add/i }).click()

    await input.fill('Task two')
    await page.getByRole('button', { name: /add/i }).click()

    await expect(page.getByText('Task one')).toBeVisible()
    await expect(page.getByText('Task two')).toBeVisible()
    await expect(page.getByRole('listitem')).toHaveCount(2)
  })

  test('user can add a todo by pressing Enter', async ({ page }) => {
    await page.getByLabel('New todo').fill('Press enter todo')
    await page.getByLabel('New todo').press('Enter')
    await expect(page.getByText('Press enter todo')).toBeVisible()
  })

  test('error message appears for empty submission', async ({ page }) => {
    await page.getByRole('button', { name: /add/i }).click()
    await expect(page.getByRole('alert')).toContainText(/please enter/i)
  })

  test('user can toggle a todo as completed', async ({ page }) => {
    await page.getByLabel('New todo').fill('Complete me')
    await page.getByRole('button', { name: /add/i }).click()

    const checkbox = page.getByRole('checkbox', { name: /toggle: complete me/i })
    await expect(checkbox).not.toBeChecked()
    await checkbox.click()
    await expect(checkbox).toBeChecked()
  })

  test('user can delete a todo', async ({ page }) => {
    await page.getByLabel('New todo').fill('Delete me please')
    await page.getByRole('button', { name: /add/i }).click()

    await expect(page.getByText('Delete me please')).toBeVisible()
    await page.getByRole('button', { name: /delete: delete me please/i }).click()

    await expect(page.getByText('Delete me please')).not.toBeVisible()
    await expect(page.getByTestId('empty-msg')).toBeVisible()
  })

  test('deleting one todo preserves the others', async ({ page }) => {
    const input = page.getByLabel('New todo')
    const addBtn = page.getByRole('button', { name: /add/i })

    await input.fill('Keep this')
    await addBtn.click()
    await input.fill('Remove this')
    await addBtn.click()

    await page.getByRole('button', { name: /delete: remove this/i }).click()

    await expect(page.getByText('Keep this')).toBeVisible()
    await expect(page.getByText('Remove this')).not.toBeVisible()
    await expect(page.getByRole('listitem')).toHaveCount(1)
  })
})
