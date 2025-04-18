"use client";
import { aggregatePerson } from "@/lib/tmdb/lib";
import { cn } from "@/lib/utils";
import type {
	Credits,
	Movie,
	MovieDetails,
	TMDBListResponse,
} from "@/types/tmdb";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MovieList } from "./movie-list";
import { PersonList } from "./person-list";

type Props = {
	movie: MovieDetails;
	credits: Credits | null;
	recommendations: TMDBListResponse<Movie> | null;
};

export function MovieTabs({ movie, credits, recommendations }: Props) {
	const [activeTab, setActiveTab] = useState("about");
	const t = useTranslations("Movie.Detail");

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	const cast = credits?.cast ? aggregatePerson(credits.cast, "cast") : [];
	const crew = credits?.crew ? aggregatePerson(credits.crew, "crew") : [];
	const recommendationMovies = recommendations?.results || [];

	const sections = [
		{ id: "about", label: t("tabs.overview.title") },
		{ id: "cast", label: t("tabs.cast") },
		{ id: "crew", label: t("tabs.crew") },
		{ id: "recommendations", label: t("tabs.recommendations") },
	];

	const movieInfo = [
		{
			label: t("tabs.overview.releaseDate"),
			value: movie.release_date
				? format(movie.release_date, "yyyy/MM/dd")
				: "-",
		},
		{
			label: t("tabs.overview.runtime"),
			value: movie.runtime ? `${movie.runtime}分` : "-",
		},
		{
			label: t("tabs.overview.productionCompanies"),
			value:
				movie.production_companies?.map((company) => company.name).join("・") ||
				"-",
		},
		{
			label: t("tabs.overview.productionCountries"),
			value:
				movie.production_countries?.map((country) => country.name).join("・") ||
				"-",
		},
		{
			label: t("tabs.overview.languages"),
			value: movie.spoken_languages?.map((lang) => lang.name).join("・") || "-",
		},
		{
			label: t("tabs.overview.budget"),
			value: movie.budget ? `$${movie.budget.toLocaleString()}` : "-",
		},
		{
			label: t("tabs.overview.revenue"),
			value: movie.revenue ? `$${movie.revenue.toLocaleString()}` : "-",
		},
	];

	return (
		<div>
			{/* <Tabs
				defaultValue="about"
				value={activeTab}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
					{sections.map((section) => (
						<TabsTrigger
							key={section.id}
							value={section.id}
							className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
						>
							{section.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs> */}
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
				{activeTab === "about" &&
					(movie ? (
						<ul className="space-y-3">
							{movieInfo.map((item) => (
								<li
									key={item.label}
									className="flex items-start gap-4 border-border/50 border-b pb-2 last:border-0"
								>
									<span className="whitespace-nowrap text-muted-foreground text-sm">
										{item.label}
									</span>
									<span className="ml-auto text-right font-medium text-sm">
										{item.value}
									</span>
								</li>
							))}
						</ul>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							概要情報がありません
						</div>
					))}

				{activeTab === "cast" &&
					(cast.length > 0 ? (
						<PersonList people={cast} />
					) : (
						<div className="text-center py-8 text-muted-foreground">
							キャスト情報がありません
						</div>
					))}

				{activeTab === "crew" &&
					(crew.length > 0 ? (
						<PersonList people={crew} />
					) : (
						<div className="text-center py-8 text-muted-foreground">
							スタッフ情報がありません
						</div>
					))}

				{activeTab === "recommendations" &&
					(recommendationMovies.length > 0 ? (
						<MovieList movies={recommendationMovies} />
					) : (
						<div className="text-center py-8 text-muted-foreground">
							おすすめ作品がありません
						</div>
					))}
			</div>
		</div>
	);
}
