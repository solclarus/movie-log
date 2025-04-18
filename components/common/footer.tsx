import { siteConfig } from "@/config/site";

export function Footer() {
	return (
		<footer className="sticky top-full h-16 px-10 py-6">
			<div className="flex items-center justify-center text-muted-foreground text-sm">
				<span>
					&copy; {new Date().getFullYear()} {siteConfig.name}
				</span>
			</div>
		</footer>
	);
}
