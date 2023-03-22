import { expect, test } from '@playwright/test'

test('Netflikemon login page is render as expected', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Netflikemon/)
  await expect(page.getByTestId('login-form')).toBeInViewport()
  await expect(page.getByTestId('email-input')).toBeInViewport()
  await expect(page.getByTestId('password-input')).toBeInViewport()
  await expect(page.getByTestId('login')).toBeEnabled()
})

test('able to login/logout successfully', async ({ page }) => {
  await page.goto('/')

  const loginForm = page.getByTestId('login-form')

  await loginForm.getByTestId('email-input').type('playwright@example.com')
  await loginForm.getByTestId('password-input').type('abcdefg1234')
  await loginForm.getByTestId('login').click()

  await page.getByTestId('avatar').isVisible()
  await expect(page.getByTestId('login-form')).not.toBeInViewport()

  await page.getByTestId('logout').click()

  await expect(page.getByTestId('login-form')).toBeInViewport()
  await expect(page.getByTestId('email-input')).toBeInViewport()
  await expect(page.getByTestId('password-input')).toBeInViewport()
  await expect(page.getByTestId('login')).toBeEnabled()
})
