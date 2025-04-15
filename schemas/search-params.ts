import { z } from "zod";

export const searchParamsSchema = z.object({
	category: z
		.enum(["now-playing", "top-rated", "popular", "upcoming"])
		.default("now-playing"),
	page: z
		.string()
		.optional()
		.transform((v) => v || "1")
		.pipe(
			z
				.string()
				.regex(/^\d+$/)
				.transform((v) => Number.parseInt(v, 10))
				.refine((v) => v > 0)
				.refine((v) => v <= 500),
		),
});
