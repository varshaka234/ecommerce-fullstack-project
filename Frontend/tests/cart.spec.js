
import { test, expect } from "@playwright/test";

const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;

// Login before every test
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
  ).toBeVisible();
});

// Test 1: Customer can open the cart
test("Customer can open the cart", async ({ page }) => {
  await page.getByText(/^Cart \(/).click();

  await expect(
    page.getByRole("heading", { name: "Your cart" })
  ).toBeVisible();
});

// Test 2: Customer can add a product to the cart
test("Customer can add a product to the cart", async ({ page }) => {
  await page.locator(".logo").click();

  const firstProduct = page.locator("#products .product").first();

  await expect(firstProduct).toBeVisible();

  const productName = await firstProduct.locator("h4").textContent();

  await firstProduct
    .getByRole("button", { name: "Add to cart" })
    .click();

  await expect(
    page.getByText(`${productName} added to cart`)
  ).toBeVisible();

  await page.getByText(/^Cart \(/).click();

  await expect(
    page.locator(".cart-item").filter({ hasText: productName })
  ).toBeVisible();
});

// Test 3: Customer can increase product quantity
test("Customer can increase product quantity", async ({ page }) => {
  await page.locator(".logo").click();

  const firstProduct = page.locator("#products .product").first();
  const productName = await firstProduct.locator("h4").textContent();

  await firstProduct
    .getByRole("button", { name: "Add to cart" })
    .click();

  await page.getByText(/^Cart \(/).click();

  const cartItem = page.locator(".cart-item").filter({
    hasText: productName,
  });

  const quantity = cartItem.locator(".qty span");
  const initialQty = Number(await quantity.textContent());

  await cartItem
    .locator(".qty")
    .getByRole("button", { name: "+" })
    .click();

  await expect(quantity).toHaveText(String(initialQty + 1));
});

// Test 4: Customer can decrease product quantity
test("Customer can decrease product quantity", async ({ page }) => {
  await page.locator(".logo").click();

  const firstProduct = page.locator("#products .product").first();
  const productName = await firstProduct.locator("h4").textContent();

  await firstProduct
    .getByRole("button", { name: "Add to cart" })
    .click();

  await page.getByText(/^Cart \(/).click();

  const cartItem = page.locator(".cart-item").filter({
    hasText: productName,
  });

  const quantity = cartItem.locator(".qty span");
  const initialQty = Number(await quantity.textContent());

  // Increase once so decreasing is possible
  await cartItem
    .locator(".qty")
    .getByRole("button", { name: "+" })
    .click();

  await expect(quantity).toHaveText(String(initialQty + 1));

  // Decrease once
  await cartItem
    .locator(".qty")
    .getByRole("button", { name: "−" })
    .click();

  await expect(quantity).toHaveText(String(initialQty));
});

// Test 5: Customer can remove a product from the cart
test("Customer can remove a product from the cart", async ({ page }) => {
  await page.locator(".logo").click();

  const firstProduct = page.locator("#products .product").first();
  const productName = await firstProduct.locator("h4").textContent();

  await firstProduct
    .getByRole("button", { name: "Add to cart" })
    .click();

  await page.getByText(/^Cart \(/).click();

  const cartItem = page.locator(".cart-item").filter({
    hasText: productName,
  });

  await expect(cartItem).toBeVisible();

  await cartItem.getByRole("button", { name: "Remove" }).click();

  await expect(cartItem).toHaveCount(0);
  await expect(page.getByText("Your cart is empty.")).toBeVisible();
});
