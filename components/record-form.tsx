"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addRecord, updateRecord } from "@/actions/record";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Form schema
const recordFormSchema = z.object({
	tmdbMovieId: z.number().int().positive(),
	watchDate: z.date(),
	rating: z.number().int().min(1).max(5).nullable(),
	review: z.string().max(1000).nullable(),
	isPublic: z.boolean().default(true),
	venue: z.string().max(100).nullable(),
});

type RecordFormValues = z.infer<typeof recordFormSchema>;

// Props for the form
type RecordFormProps = {
	mode: "create" | "edit";
	initialData?: {
		id?: string;
		tmdbMovieId: number;
		movieTitle?: string;
		watchDate: Date;
		rating: number | null;
		review: string | null;
		isPublic: boolean;
		venue: string | null;
	};
	userId?: string;
	onSuccess?: () => void;
};

export function RecordForm({
	mode,
	initialData,
	userId,
	onSuccess,
}: RecordFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [movieTitle, setMovieTitle] = useState(initialData?.movieTitle || "");
	const [isSearchingMovie, setIsSearchingMovie] = useState(false);

	// Initialize form with default values
	const form = useForm<RecordFormValues>({
		resolver: zodResolver(recordFormSchema),
		defaultValues: {
			tmdbMovieId: initialData?.tmdbMovieId || 0,
			watchDate: initialData?.watchDate || new Date(),
			rating: initialData?.rating || null,
			review: initialData?.review || null,
			isPublic: initialData?.isPublic ?? true,
			venue: initialData?.venue || null,
		},
	});

	// Mock function to search for a movie - in a real app, you'd connect to TMDB API
	const handleMovieSearch = async (searchTerm: string) => {
		setIsSearchingMovie(true);

		// This would be replaced with actual API call to TMDB
		try {
			// Simulating API request delay
			await new Promise((resolve) => setTimeout(resolve, 500));

			// In a real implementation, you would:
			// 1. Call TMDB API with the search term
			// 2. Display results for user to select
			// 3. When user selects a movie, set the tmdbMovieId and title

			// For demo purposes, just setting a fake movie
			if (searchTerm) {
				setMovieTitle(`映画: ${searchTerm}`);
				form.setValue("tmdbMovieId", Math.floor(Math.random() * 1000000) + 1);
			}
		} catch (error) {
			toast.error("映画の検索中にエラーが発生しました");
			console.error(error);
		} finally {
			setIsSearchingMovie(false);
		}
	};

	// Handle form submission
	const onSubmit = async (data: RecordFormValues) => {
		if (form.formState.isSubmitting || isSubmitting) return;

		setIsSubmitting(true);

		try {
			if (mode === "create") {
				// Add userId to the data for new records
				const result = await addRecord({
					...data,
					userId: userId || "",
				});

				if (result.success) {
					toast.success("鑑賞記録を作成しました");
					form.reset();
					onSuccess?.();
				} else {
					toast.error(result.error || "エラーが発生しました");
				}
			} else if (mode === "edit" && initialData?.id) {
				const result = await updateRecord(initialData.id, data);

				if (result.success) {
					toast.success("鑑賞記録を更新しました");
					onSuccess?.();
				} else {
					toast.error(result.error || "エラーが発生しました");
				}
			}
		} catch (error) {
			toast.error("処理中にエラーが発生しました");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Movie Search (in a real app, this would be connected to TMDB API) */}
				<div className="space-y-2">
					<FormLabel>映画</FormLabel>
					<div className="flex gap-2">
						<Input
							value={movieTitle}
							onChange={(e) => setMovieTitle(e.target.value)}
							placeholder="映画タイトルを入力..."
							disabled={mode === "edit" || isSubmitting}
						/>
						<Button
							type="button"
							variant="secondary"
							onClick={() => handleMovieSearch(movieTitle)}
							disabled={
								mode === "edit" ||
								!movieTitle ||
								isSubmitting ||
								isSearchingMovie
							}
						>
							{isSearchingMovie ? "検索中..." : "検索"}
						</Button>
					</div>
					{movieTitle && form.getValues("tmdbMovieId") > 0 && (
						<p className="text-sm text-muted-foreground">
							選択した映画: {movieTitle}
						</p>
					)}
				</div>

				{/* Watch Date */}
				<FormField
					control={form.control}
					name="watchDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>鑑賞日</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={`w-full justify-start text-left font-normal ${
												!field.value ? "text-muted-foreground" : ""
											}`}
											disabled={isSubmitting}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value ? (
												format(field.value, "yyyy年MM月dd日", { locale: ja })
											) : (
												<span>日付を選択</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date > new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Rating */}
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormLabel>評価</FormLabel>
							<Select
								disabled={isSubmitting}
								onValueChange={(value) =>
									field.onChange(value ? Number.parseInt(value) : null)
								}
								value={field.value?.toString() || ""}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="評価を選択" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="1">1 - 非常に悪い</SelectItem>
									<SelectItem value="2">2 - 悪い</SelectItem>
									<SelectItem value="3">3 - 普通</SelectItem>
									<SelectItem value="4">4 - 良い</SelectItem>
									<SelectItem value="5">5 - 素晴らしい</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Venue */}
				<FormField
					control={form.control}
					name="venue"
					render={({ field }) => (
						<FormItem>
							<FormLabel>鑑賞場所</FormLabel>
							<FormControl>
								<Input
									disabled={isSubmitting}
									placeholder="シネマシティ、自宅など"
									{...field}
									value={field.value || ""}
									onChange={(e) => field.onChange(e.target.value || null)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Review */}
				<FormField
					control={form.control}
					name="review"
					render={({ field }) => (
						<FormItem>
							<FormLabel>レビュー</FormLabel>
							<FormControl>
								<Textarea
									disabled={isSubmitting}
									placeholder="映画の感想を書いてください..."
									className="resize-none min-h-[100px]"
									{...field}
									value={field.value || ""}
									onChange={(e) => field.onChange(e.target.value || null)}
								/>
							</FormControl>
							<FormDescription>最大1000文字まで入力できます。</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Public/Private */}
				<FormField
					control={form.control}
					name="isPublic"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">公開設定</FormLabel>
								<FormDescription>
									このレビューを他のユーザーに公開しますか？
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									disabled={isSubmitting}
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-2">
					{mode === "edit" && (
						<Button
							type="button"
							variant="outline"
							onClick={onSuccess}
							disabled={isSubmitting}
						>
							キャンセル
						</Button>
					)}
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting
							? "送信中..."
							: mode === "create"
								? "記録を作成"
								: "変更を保存"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
