import { test, expect } from "@playwright/test";

test("Customer can open the login page", async ({ page }) => {
    // Open ecommerce website
    await page.goto("/");

    // Click Login in Navbar
    await page.getByText("Login", { exact: true }).click();

    // Verify login page is displayed
    await expect(
        page.getByRole("heading", { name: "Welcome back" }),
    ).toBeVisible();

    // Verify email and password fields
    await expect(page.getByPlaceholder("Email address")).toBeVisible();

    await expect(
        page.getByPlaceholder("Password (at least 8 characters)"),
    ).toBeVisible();
});
test("Customer can log in successfully", async ({ page }) => {
    test.skip(
        !process.env.TEST_EMAIL || !process.env.TEST_PASSWORD,
        "Set test account credentials first",
    );

    await page.goto("/");

    await page.getByText("Login", { exact: true }).click();

    await page.getByPlaceholder("Email address").fill(process.env.TEST_EMAIL);

    await page
        .getByPlaceholder("Password (at least 8 characters)")
        .fill(process.env.TEST_PASSWORD);

    await page.getByRole("button", { name: "Log in" }).click();

    // Successful login should show Logout in the Navbar
    await expect(page.getByText("Logout", { exact: true })).toBeVisible();
});
test("Customer cannot log in with incorrect password", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Login", { exact: true }).click();

    await page
        .getByPlaceholder("Email address")
        .fill("playwrighttest@example.com");

    await page
        .getByPlaceholder("Password (at least 8 characters)")
        .fill("WrongPassword123");

    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.locator(".auth-error")).toBeVisible();
});

test("Customer can open the signup form", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Login", { exact: true }).click();

    await page.getByText("Create an account", { exact: true }).click();

    await expect(
        page.getByRole("heading", { name: "Create account" }),
    ).toBeVisible();

    await expect(page.getByPlaceholder("Full name")).toBeVisible();
    await expect(page.getByPlaceholder("Email address")).toBeVisible();
    await expect(
        page.getByPlaceholder("Password (at least 8 characters)"),
    ).toBeVisible();
});

test("Customer can register successfully", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Login", { exact: true }).click();
    await page.getByText("Create an account", { exact: true }).click();

    const uniqueEmail = `playwright${Date.now()}@example.com`;

    await page.getByPlaceholder("Full name").fill("Playwright Customer");
    await page.getByPlaceholder("Email address").fill(uniqueEmail);
    await page
        .getByPlaceholder("Password (at least 8 characters)")
        .fill("TestPassword123!");

    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText("Logout", { exact: true })).toBeVisible();
});

test("Customer cannot register with an existing email", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Login", { exact: true }).click();
    await page.getByText("Create an account", { exact: true }).click();

    const uniqueEmail = `duplicate${Date.now()}@example.com`;

    // Register the first customer
    await page.getByPlaceholder("Full name").fill("Test Customer");
    await page.getByPlaceholder("Email address").fill(uniqueEmail);
    await page
        .getByPlaceholder("Password (at least 8 characters)")
        .fill("TestPassword123!");

    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText("Logout", { exact: true })).toBeVisible();

    // Log out
    await page.getByText("Logout", { exact: true }).click();

    // Try registering with the same email
    await page.getByText("Login", { exact: true }).click();
    await page.getByText("Create an account", { exact: true }).click();

    await page.getByPlaceholder("Full name").fill("Another Customer");
    await page.getByPlaceholder("Email address").fill(uniqueEmail);
    await page
        .getByPlaceholder("Password (at least 8 characters)")
        .fill("TestPassword123!");

    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator(".auth-error")).toBeVisible();
});
