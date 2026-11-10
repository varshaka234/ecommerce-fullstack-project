
import { test, expect } from "@playwright/test";

test("Customer can view featured products", async ({ page }) => {
  await page.goto("/");

  const featured = page.locator("#products");

  await expect(
    featured.getByRole("heading", { name: "Featured Products" })
  ).toBeVisible();

  await expect(
    featured.getByRole("button", { name: "Shop more" })
  ).toBeVisible();

  await expect(featured.locator(".product").first()).toBeVisible();
});

test("Customer can open the shop section", async ({ page }) => {
  await page.goto("/");

  await page.locator("#products")
    .getByRole("button", { name: "Shop more" })
    .click();

  await expect(
    page.locator(".shop").getByRole("heading", { name: "Shop" })
  ).toBeVisible();
});

test("Customer can filter products by type", async ({ page }) => {
  await page.goto("/");

  await page.locator("#products")
    .getByRole("button", { name: "Shop more" })
    .click();

  const shop = page.locator(".shop");

  await shop.getByRole("button", { name: "Sneakers", exact: true }).click();

  await expect(shop.getByText(/products$/)).toBeVisible();

  await expect(
    shop.getByRole("button", { name: "Clear filters" })
  ).toBeVisible();
});

test("Customer can sort products by price", async ({ page }) => {
  await page.goto("/");

  await page.locator("#products")
    .getByRole("button", { name: "Shop more" })
    .click();

  const sort = page.locator(".shop select");

  await sort.selectOption("low");
  await expect(sort).toHaveValue("low");

  await sort.selectOption("high");
  await expect(sort).toHaveValue("high");
});

test("Customer can clear product filters", async ({ page }) => {
  await page.goto("/");

  await page.locator("#products")
    .getByRole("button", { name: "Shop more" })
    .click();

  const shop = page.locator(".shop");

  await shop.getByRole("button", { name: "Sneakers", exact: true }).click();

  await shop.getByRole("button", { name: "Clear filters" }).click();

  await expect(
    shop.getByRole("button", { name: "Clear filters" })
  ).toHaveCount(0);
});
