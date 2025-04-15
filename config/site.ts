import {
	CalendarIcon,
	HeartIcon,
	PlayIcon,
	StarIcon,
	UserIcon,
	VideoIcon,
} from "lucide-react";

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
			title: "Movie",
			icon: VideoIcon,
			items: [
				{
					title: "Now Playing",
					url: "/movie?category=now-playing",
					icon: PlayIcon,
				},
				{
					title: "Popular",
					url: "/movie?category=popular",
					icon: HeartIcon,
				},
				{
					title: "Top Rated",
					url: "/movie?category=top-rated",
					icon: StarIcon,
				},
				{
					title: "Upcoming",
					url: "/movie?category=upcoming",
					icon: CalendarIcon,
				},
			],
		},
		{
			title: "Person",
			icon: UserIcon,
			items: [
				{
					title: "Popular",
					url: "/person?page=1",
				},
			],
		},
	],
};
