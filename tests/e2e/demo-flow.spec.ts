import { expect, test } from "@playwright/test";

test("demo workflow from login to draft export", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByText("Turn denials into evidence-ready appeal packets.")).toBeVisible();

  await page.getByRole("link", { name: /Enter demo workspace/i }).click();
  await expect(page.getByRole("heading", { name: /Today's denial recovery work/i })).toBeVisible();

  await page.getByRole("link", { name: /Open case/i }).first().click();
  await expect(page.getByRole("heading", { name: /appeal workspace/i })).toBeVisible();

  await page.getByRole("link", { name: /Open evidence map/i }).click();
  await expect(page.getByRole("heading", { name: /Map denial criteria/i })).toBeVisible();
  await page.getByRole("button", { name: /IV antibiotic administration/i }).click();
  await expect(page.getByLabel("Source drawer")).toContainText("Patient requires IV cefazolin");

  await page.getByRole("link", { name: /Generate packet/i }).click();
  await expect(page.getByRole("heading", { name: /Draft a citation-backed appeal packet/i })).toBeVisible();
  await expect(page.getByText("Status: DRAFT")).toBeVisible();

  await page.getByRole("link", { name: /Export workflow/i }).click();
  await expect(page.getByRole("heading", { name: /Export draft or approved packet/i })).toBeVisible();
});
