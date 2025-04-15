"use client";

import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { MovieDetails } from "@/types/tmdb";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { BookOpenIcon, CalendarIcon, PinIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Rating } from "./ui/rating";

type Props = {
	movie: MovieDetails;
};

// Create a schema for form validation
const formSchema = z.object({
	rating: z.number().min(1, "評価を選択してください"),
	review: z.string().optional(),
	watchDate: z.date({
		required_error: "鑑賞日を選択してください",
	}),
});

type FormValues = z.infer<typeof formSchema>;

export const MovieRecordButtons = ({ movie }: Props) => {
	const t = useTranslations("Movie.Detail");
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form with react-hook-form
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rating: 0,
			review: "",
			watchDate: new Date(), // Default to today
		},
	});

	const onSubmit = async (values: FormValues) => {
		try {
			setIsSubmitting(true);

			toast(`${movie.title}`, {
				description: `${values.watchDate.toLocaleDateString("ja-JP")}の鑑賞記録を投稿しました`,
			});

			form.reset();
			setOpen(false);
		} catch (error) {
			console.error("鑑賞記録の投稿に失敗しました", error);
			toast.error("投稿に失敗しました。もう一度お試しください。");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mb-6 flex items-center gap-3">
			<Button className="flex-1">
				<PinIcon className="mr-2 h-4 w-4" />
				{t("buttons.addToWatchlist")}
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="flex-1 bg-primary">
						<BookOpenIcon className="mr-2 h-4 w-4" />
						{t("buttons.addToFavorites")}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>{movie.title}</DialogTitle>
						<DialogDescription>
							この映画の評価とレビューを記録します。
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid gap-4 py-4"
						>
							<FormField
								control={form.control}
								name="watchDate"
								render={({ field }) => (
									<FormItem className="flex flex-col gap-2">
										<FormLabel>鑑賞日</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground",
														)}
													>
														{field.value ? (
															format(field.value, "yyyy年MM月dd日", {
																locale: ja,
															})
														) : (
															<span>日付を選択</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
													locale={ja}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rating"
								render={({ field }) => (
									<FormItem className="flex flex-col gap-2">
										<FormLabel>評価</FormLabel>
										<FormControl>
											<Rating
												value={field.value}
												onChange={field.onChange}
												max={5}
												id="rating"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="review"
								render={({ field }) => (
									<FormItem className="flex flex-col gap-2">
										<FormLabel>レビュー</FormLabel>
										<FormControl>
											<Input
												placeholder="映画の感想を書いてください..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className="flex items-center gap-3 pt-2">
								<DialogClose asChild>
									<Button type="button" variant="secondary" className="flex-1">
										キャンセル
									</Button>
								</DialogClose>
								<Button
									type="submit"
									disabled={isSubmitting}
									className="flex-1"
								>
									{isSubmitting ? "投稿中..." : "投稿する"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
