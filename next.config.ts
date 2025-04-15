import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "image.tmdb.org",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
