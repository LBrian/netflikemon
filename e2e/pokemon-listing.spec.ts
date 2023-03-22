import { expect, test } from '@playwright/test'

test('listing page is render as expected', async ({ page }) => {
  await page.goto('/')

  const loginForm = page.getByTestId('login-form')

  await loginForm.getByTestId('email-input').type('playwright@example.com')
  await loginForm.getByTestId('password-input').type('abcdefg1234')
  await loginForm.getByTestId('login').click()

  await page.getByTestId('avatar').isVisible()

  await expect(page.getByTestId('pokemon-filter')).toBeInViewport()
  await expect(page.getByTestId('previous-page')).toBeDisabled()
  await expect(page.getByTestId('next-page')).toBeEnabled()
  await expect(page.getByTestId(/^pokemon-item/)).toHaveCount(40)
})

test('filter pokemon works', async ({ page }) => {
  await page.goto('/')

  const loginForm = page.getByTestId('login-form')

  await loginForm.getByTestId('email-input').type('playwright@example.com')
  await loginForm.getByTestId('password-input').type('abcdefg1234')
  await loginForm.getByTestId('login').click()

  await page.getByTestId('avatar').isVisible()

  await page.getByTestId('pokemon-filter').type('squirtle')
  await expect(page.getByTestId(/^pokemon-item/)).toHaveCount(1)
})

test('filter should be reset when go to next page', async ({ page }) => {
  await page.goto('/')

  const loginForm = page.getByTestId('login-form')

  await loginForm.getByTestId('email-input').type('playwright@example.com')
  await loginForm.getByTestId('password-input').type('abcdefg1234')
  await loginForm.getByTestId('login').click()

  await page.getByTestId('avatar').isVisible()

  await page.getByTestId('pokemon-filter').type('squirtle')
  await expect(page.getByTestId(/^pokemon-item/)).toHaveCount(1)
  await page.getByTestId('next-page').click()
  await expect(page.getByTestId(/^pokemon-item/)).toHaveCount(40)
})

test('pagination should work as expected', async ({ page }) => {
  await page.goto('/')

  const loginForm = page.getByTestId('login-form')

  await loginForm.getByTestId('email-input').type('playwright@example.com')
  await loginForm.getByTestId('password-input').type('abcdefg1234')
  await loginForm.getByTestId('login').click()

  await page.getByTestId('avatar').isVisible()

  await expect(page.getByTestId(/^pokemon-item/).first()).toHaveText('bbulbasaur')
  await expect(page.getByTestId(/^pokemon-item/).last()).toHaveText('wwigglytuff')

  await page.getByTestId('next-page').click()

  await expect(page.getByTestId(/^pokemon-item/).first()).not.toHaveText('bbulbasaur')
  await expect(page.getByTestId(/^pokemon-item/).last()).not.toHaveText('wwigglytuff')
})
