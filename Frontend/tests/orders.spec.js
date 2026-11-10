
import { test, expect } from "@playwright/test";

const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await page.getByText("Login", { exact: true }).click();

  await page.getByPlaceholder("Email address").fill(email);
  await page
    .getByPlaceholder("Password (at least 8 characters)")
    .fill(password);

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByText("Logout", { exact: true })
  ).toBeVisible({ timeout: 10000 });
});

test("Customer can view order history", async ({ page }) => {
  // Open customer dashboard
 await page.getByText(/^Hi,/).click();

  // Check orders section
  await expect(page.getByText(/My Orders|Order History/i)).toBeVisible();
});

test("Customer can see previously placed orders", async ({ page }) => {
  await page.getByText(/^Hi,/).click();

  // Check order history
  await expect(
    page.getByRole("heading", { name: "My orders" })
  ).toBeVisible();

  // Check that at least one order exists
  await expect(page.locator(".order").first()).toBeVisible();

  // Check order information
  await expect(page.locator(".order").first()).toContainText("Order #");
  await expect(page.locator(".order").first()).toContainText("Order Status");
});
