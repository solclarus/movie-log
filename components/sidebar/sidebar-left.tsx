"use client";

import { LocaleSwitcher } from "@/components/common/locale-switcher";
import { SearchBox } from "@/components/search-box";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { ChevronRight, Command } from "lucide-react";
import Link from "next/link";

export function SidebarLeft() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size={"lg"} asChild>
							<Link href={"/"}>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-extrabold text-xl">
										{siteConfig.name}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<SearchBox />
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					<SidebarGroup>
						<SidebarGroupLabel>Movie</SidebarGroupLabel>
						<SidebarMenu>
							{siteConfig.navigation.map((item) => (
								<Collapsible
									key={item.title}
									asChild
									className="group/collapsible"
									defaultOpen={true}
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.title}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<a href={subItem.url}>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Settings</SidebarGroupLabel>
						<SidebarMenu>
							<div className="flex items-center gap-2">
								<ThemeSwitcher />
								<LocaleSwitcher />
							</div>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarMenu>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
