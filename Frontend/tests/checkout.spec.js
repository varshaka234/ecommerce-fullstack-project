
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

  const loginResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/login/") &&
      response.request().method() === "POST"
  );

  await page.getByRole("button", { name: "Log in" }).click();

  const loginResponse = await loginResponsePromise;

  console.log("Login status:", loginResponse.status());
  console.log("Login response:", await loginResponse.text());

  await expect(
    page.getByText("Logout", { exact: true })
  ).toBeVisible({ timeout: 10000 });
  // Add product and open checkout
  await page.locator(".logo").click();

  const firstProduct = page.locator("#products .product").first();

  await firstProduct
    .getByRole("button", { name: "Add to cart" })
    .click();

  await page.getByText(/^Cart \(/).click();

  await page
    .getByRole("button", { name: "Proceed to payment" })
    .click();

  await expect(
    page.getByRole("heading", { name: "Checkout" })
  ).toBeVisible();
});


// Test 1: Customer can open checkout
test("Customer can open checkout", async ({ page }) => {
  await expect(
    page.getByPlaceholder("Full name")
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("Phone number")
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("Address")
  ).toBeVisible();
});

// Test 2: Cash on delivery is selected by default
test("Cash on delivery is selected by default", async ({ page }) => {
  await expect(
    page.getByRole("radio", { name: "Cash on delivery" })
  ).toBeChecked();
});

// Test 3: Customer can select UPI
test("Customer can select UPI payment", async ({ page }) => {
  await page.getByRole("radio", { name: "UPI" }).check();

  await expect(
    page.getByPlaceholder("UPI ID (name@bank)")
  ).toBeVisible();
});

// Test 4: Customer can select Card
test("Customer can select Card payment", async ({ page }) => {
  await page.getByRole("radio", { name: "Card" }).check();

  await expect(
    page.getByPlaceholder("Card number (demo only)")
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("MM/YY")
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("CVV")
  ).toBeVisible();
});
test("Customer cannot place an order with empty required fields", async ({
  page,
}) => {
  const payButton = page.getByRole("button", { name: /Pay/ });

  await payButton.click();

  const nameInput = page.getByPlaceholder("Full name");

  await expect(nameInput).toBeFocused();
});

test("Customer can place an order successfully", async ({ page }) => {
  // Fill delivery details
  await page.getByPlaceholder("Full name").fill("Test Customer");

  await page.getByPlaceholder("Phone number").fill("9876543210");

  await page
    .getByPlaceholder("Address")
    .fill("Kochi, Kerala");

  // Capture the order API response
  const orderResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/orders/") &&
      response.request().method() === "POST"
  );

  // Place order
  await page.getByRole("button", { name: /Pay/ }).click();

  const orderResponse = await orderResponsePromise;

  console.log("Order API status:", orderResponse.status());
  console.log("Order API response:", await orderResponse.text());

  // Check successful order placement
  expect(orderResponse.ok()).toBeTruthy();

  await expect(
    page.getByRole("heading", { name: "Order placed" })
  ).toBeVisible();

  // Return to shopping
  await page.getByRole("button", { name: "Keep shopping" }).click();

  // Open cart
  await page.getByText(/^Cart \(/).click();

  // Verify cart is empty
  await expect(
    page.getByText("Your cart is empty.")
  ).toBeVisible();
});
