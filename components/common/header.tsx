import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b">
			<SidebarTrigger className="ml-4" />
		</header>
	);
}
