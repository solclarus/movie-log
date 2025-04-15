"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, Eye, EyeOff, MapPin, Star } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Mock data based on the provided example
const mockReviews = [
	{
		id: "clj2gvxt9000088la4xvk3i2h",
		userId: "usr_2c9M7N8L5k1pQ3r6S0t4",
		tmdbMovieId: 550,
		watchDate: "2024-04-01T18:30:00.000Z",
		rating: 4,
		review:
			"クラシックな作品。二度目の鑑賞でも新たな発見があった。特に後半のプロットの展開が素晴らしい。",
		isPublic: true,
		venue: "シネマシティ",
		createdAt: "2024-04-01T19:45:12.000Z",
		updatedAt: "2024-04-01T19:45:12.000Z",
		movieTitle: "ファイト・クラブ", // Added for display purposes
	},
	{
		id: "clj2gvxt9000088la4xvk3i2j",
		userId: "usr_2c9M7N8L5k1pQ3r6S0t4",
		tmdbMovieId: 680,
		watchDate: "2024-03-15T20:00:00.000Z",
		rating: 5,
		review: "傑作中の傑作。何度見ても感動する。音楽と映像の調和が素晴らしい。",
		isPublic: true,
		venue: "自宅",
		createdAt: "2024-03-15T23:10:22.000Z",
		updatedAt: "2024-03-15T23:10:22.000Z",
		movieTitle: "パルプ・フィクション", // Added for display purposes
	},
	{
		id: "clj2gvxt9000088la4xvk3i2k",
		userId: "usr_2c9M7N8L5k1pQ3r6S0t4",
		tmdbMovieId: 155,
		watchDate: "2024-02-20T19:15:00.000Z",
		rating: 3,
		review:
			"面白かったが、期待ほどではなかった。キャラクターの描写は良かった。",
		isPublic: false,
		venue: "TOHOシネマズ",
		createdAt: "2024-02-20T22:30:45.000Z",
		updatedAt: "2024-02-20T22:30:45.000Z",
		movieTitle: "ダークナイト", // Added for display purposes
	},
];

export function ReviewList() {
	const [sortBy, setSortBy] = useState("watchDate");
	const [filterPublic, setFilterPublic] = useState("all");

	const sortedAndFilteredReviews = [...mockReviews]
		.filter((review) => {
			if (filterPublic === "public") return review.isPublic;
			if (filterPublic === "private") return !review.isPublic;
			return true;
		})
		.sort((a, b) => {
			if (sortBy === "watchDate") {
				return (
					new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
				);
			}
			return b.rating - a.rating;
		});

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row gap-4 justify-between">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">並び替え:</span>
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="並び替え" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="watchDate">鑑賞日（新しい順）</SelectItem>
							<SelectItem value="rating">評価（高い順）</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">表示:</span>
					<Select value={filterPublic} onValueChange={setFilterPublic}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="表示設定" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">すべて</SelectItem>
							<SelectItem value="public">公開のみ</SelectItem>
							<SelectItem value="private">非公開のみ</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid gap-6">
				{sortedAndFilteredReviews.map((review) => (
					<Card key={review.id}>
						<CardHeader className="pb-3">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xl font-bold">{review.movieTitle}</h3>
									<div className="flex items-center gap-2 mt-1">
										<div className="flex">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={`rating-${i + 1}`}
													className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
												/>
											))}
										</div>
										<span className="text-sm font-medium">
											{review.rating}/5
										</span>
									</div>
								</div>
								<Badge
									variant={review.isPublic ? "default" : "outline"}
									className="flex items-center gap-1"
								>
									{review.isPublic ? (
										<Eye className="w-3 h-3" />
									) : (
										<EyeOff className="w-3 h-3" />
									)}
									{review.isPublic ? "公開" : "非公開"}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-sm leading-relaxed">{review.review}</p>
						</CardContent>
						<CardFooter className="pt-2 pb-4 border-t flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="w-3.5 h-3.5" />
								<span>
									鑑賞日:{" "}
									{format(new Date(review.watchDate), "yyyy年MM月dd日", {
										locale: ja,
									})}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<MapPin className="w-3.5 h-3.5" />
								<span>場所: {review.venue}</span>
							</div>
							<div className="ml-auto text-right">
								<span>
									投稿日:{" "}
									{format(new Date(review.createdAt), "yyyy年MM月dd日 HH:mm", {
										locale: ja,
									})}
								</span>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
