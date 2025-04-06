import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export type Locale = "en" | "ja";

export const routing = defineRouting({
  locales: ["en", "ja"] as Locale[],

  defaultLocale: "ja",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
