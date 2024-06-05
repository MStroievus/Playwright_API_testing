import type { Page } from "@playwright/test";

export interface IPage {
  page: Page;
  pagePath: string;
  navigateTo(url: string): Promise<void>;
}
