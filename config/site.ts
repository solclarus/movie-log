import { Inbox, Search, Sparkles, Theater } from "lucide-react";

export const siteConfig = {
	name: "Cinemento",
	description: "A website built with Next.js",
	url: "https://my-nextjs-site.com",
	metadata: {
		title: {
			default: "Cinemento",
			template: "%s | Cinemento",
		},
		description: "A comprehensive website built with Next.js",
		author: "solclarus",
	},
	navigation: [
		{
			title: "Search",
			url: "/search",
			icon: Search,
		},
		{
			title: "Records",
			url: "/records",
			icon: Sparkles,
		},
		{
			title: "Movies",
			url: "/movies",
			icon: Theater,
		},
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: Inbox,
		},
	],
};
