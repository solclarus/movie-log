"use client";

import { MovieCard } from "@/components/movie-card";
import type { aggregateMovie } from "@/lib/tmdb/lib";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
	castMovies: ReturnType<typeof aggregateMovie>;
	crewMovies: ReturnType<typeof aggregateMovie>;
};

export function Filmography({ castMovies, crewMovies }: Props) {
	const [activeTab, setActiveTab] = useState(
		castMovies.length > 0 ? "cast" : "crew",
	);

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	const hasCast = castMovies.length > 0;
	const hasCrew = crewMovies.length > 0;

	const sections = [
		...(hasCast ? [{ id: "cast", label: "出演作品" }] : []),
		...(hasCrew ? [{ id: "crew", label: "制作作品" }] : []),
		// Additional sections can be added here in the future
	];

	if (sections.length === 1) {
		const sectionId = sections[0].id;
		const sectionLabel = sections[0].label;

		return (
			<div>
				<h2 className="text-2xl font-semibold mb-4">{sectionLabel}</h2>
				<div className="grid-list">
					{sectionId === "cast" &&
						castMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
					{sectionId === "crew" &&
						crewMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="sticky top-0 z-10 bg-background">
				<div className="relative max-w-5xl">
					<div className="flex overflow-x-auto scrollbar-hide">
						<div className="flex min-w-full">
							{sections.map((tab) => (
								<button
									key={tab.id}
									type="button"
									onClick={() => handleTabChange(tab.id)}
									className={cn(
										"relative flex-1 whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors hover:bg-muted/30 sm:min-w-[100px]",
										activeTab === tab.id
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{tab.label}
									{activeTab === tab.id && (
										<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
									)}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="pt-4">
				{activeTab === "cast" && (
					<div className="grid-list">
						{castMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
					</div>
				)}

				{activeTab === "crew" && (
					<div className="grid-list">
						{crewMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								id={movie.id}
								poster_path={movie.poster_path}
								title={movie.title}
								roles={movie.roles}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
