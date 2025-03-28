import { Sidebar } from "@/components/ui/sidebar";

export function SidebarRight() {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
    />
  );
}
