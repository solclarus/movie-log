"use client";

import { MovieList } from "@/components/movie-list";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { aggregatePerson } from "@/lib/tmdb/lib";
import type {
	Credits,
	Movie,
	MovieDetails,
	TMDBListResponse,
} from "@/types/tmdb";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PersonList } from "./person-list";

type Props = {
	movie: MovieDetails;
	credits: Credits | null;
	recommendations: TMDBListResponse<Movie> | null;
};

export function MovieTabs({ movie, credits, recommendations }: Props) {
	const isMobile = useIsMobile();
	const [activeTab, setActiveTab] = useState("about");
	const t = useTranslations("Movie.Detail");

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	const cast = credits?.cast ? aggregatePerson(credits.cast, "cast") : [];
	const crew = credits?.crew ? aggregatePerson(credits.crew, "crew") : [];
	const recommendationMovies = recommendations?.results || [];

	const sections = [
		{ id: "about", label: "概要" },
		{ id: "cast", label: "キャスト" },
		{ id: "crew", label: "スタッフ" },
		{ id: "recommendations", label: "おすすめ" },
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
			{isMobile ? (
				<div className="flex items-center justify-between mb-4">
					<Select value={activeTab} onValueChange={handleTabChange}>
						<SelectTrigger defaultValue={"about"}>
							<SelectValue placeholder={"概要"} />
						</SelectTrigger>
						<SelectContent>
							{sections.map(({ id, label }) => (
								<SelectItem key={id} value={id}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			) : (
				<Tabs
					defaultValue="about"
					value={activeTab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList className="mb-4">
						{sections.map(({ id, label }) => (
							<TabsTrigger key={id} value={id}>
								{label}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			)}

			<div>
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
