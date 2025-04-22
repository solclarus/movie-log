"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import {
	CalendarIcon,
	EditIcon,
	EyeIcon,
	EyeOffIcon,
	MapPinIcon,
	MoreHorizontalIcon,
	StarIcon,
	TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { removeRecord } from "@/actions/record";
import { RecordForm } from "@/components/record-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

type Record = {
	id: string;
	userId: string;
	tmdbMovieId: number;
	watchDate: string;
	rating: number | null;
	review: string | null;
	isPublic: boolean;
	venue: string | null;
	createdAt: string;
	updatedAt: string;
	movieTitle: string;
};

type RecordListProps = {
	records: Record[];
};

export function RecordList({ records }: RecordListProps) {
	const [sortBy, setSortBy] = useState("watchDate");
	const [filterPublic, setFilterPublic] = useState("all");
	const [recordToEdit, setRecordToEdit] = useState<Record | null>(null);
	const [recordToDelete, setRecordToDelete] = useState<Record | null>(null);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const { data: session } = authClient.useSession();

	const sortedAndFilteredRecords = [...records]
		.filter((record) => {
			if (filterPublic === "public") return record.isPublic;
			if (filterPublic === "private") return !record.isPublic;
			return true;
		})
		.sort((a, b) => {
			if (sortBy === "watchDate") {
				return (
					new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
				);
			}
			// Handle sorting by rating, considering that rating can be null
			if (sortBy === "rating") {
				if (a.rating === null) return 1;
				if (b.rating === null) return -1;
				return b.rating - a.rating;
			}
			return 0;
		});

	const handleDelete = async () => {
		if (!recordToDelete) return;

		try {
			const result = await removeRecord(recordToDelete.id);

			if (result.success) {
				toast.success("鑑賞記録を削除しました");
				setIsDeleteDialogOpen(false);
			} else {
				toast.error(result.error || "削除中にエラーが発生しました");
			}
		} catch (error) {
			toast.error("処理中にエラーが発生しました");
			console.error(error);
		}
	};

	// Check if the current user can edit this record
	const canManageRecord = (record: Record) => {
		return session?.user?.id && record.userId === session?.user?.id;
	};

	return (
		<div className="space-y-3">
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

			{sortedAndFilteredRecords.length === 0 ? (
				<div className="text-center py-12 text-muted-foreground">
					表示するレコードがありません
				</div>
			) : (
				<div className="">
					{sortedAndFilteredRecords.map((record) => (
						<Card key={record.id}>
							<CardHeader className="pb-3">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-bold">{record.movieTitle}</h3>
										{record.rating !== null && (
											<div className="flex items-center gap-2 mt-1">
												<div className="flex">
													{Array.from({ length: 5 }).map((_, i) => (
														<StarIcon
															key={`rating-${record.id}-${i + 1}`}
															className={`w-4 h-4 ${
																i < (record.rating || 0)
																	? "text-yellow-500 fill-yellow-500"
																	: "text-gray-300"
															}`}
														/>
													))}
												</div>
											</div>
										)}
									</div>
									<div className="flex items-center gap-2">
										<Badge
											variant={record.isPublic ? "default" : "outline"}
											className="flex items-center gap-1"
										>
											{record.isPublic ? (
												<EyeIcon className="w-3 h-3" />
											) : (
												<EyeOffIcon className="w-3 h-3" />
											)}
											{record.isPublic ? "公開" : "非公開"}
										</Badge>

										{canManageRecord(record) && (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<MoreHorizontalIcon className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => {
															setRecordToEdit(record);
															setIsEditDialogOpen(true);
														}}
													>
														<EditIcon className="mr-2 h-4 w-4" />
														編集
													</DropdownMenuItem>
													<DropdownMenuItem
														className="text-destructive"
														onClick={() => {
															setRecordToDelete(record);
															setIsDeleteDialogOpen(true);
														}}
													>
														<TrashIcon className="mr-2 h-4 w-4" />
														削除
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										)}
									</div>
								</div>
							</CardHeader>
							{record.review && (
								<CardContent>
									<p className="text-sm leading-relaxed">{record.review}</p>
								</CardContent>
							)}
							<CardFooter className="flex flex-wrap gap-3 text-xs">
								<div className="flex items-center gap-1">
									<CalendarIcon color="orange" size={16} />
									<span>
										{format(new Date(record.watchDate), "yyyy年MM月dd日", {
											locale: ja,
										})}
									</span>
								</div>
								{record.venue && (
									<div className="flex items-center gap-1">
										<MapPinIcon color="green" size={16} />
										<span>{record.venue}</span>
									</div>
								)}
								<div className="ml-auto text-right">
									<span>
										投稿日:{" "}
										{format(
											new Date(record.createdAt),
											"yyyy年MM月dd日 HH:mm",
											{
												locale: ja,
											},
										)}
									</span>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>鑑賞記録の削除</DialogTitle>
						<DialogDescription>
							この操作は元に戻せません。この記録を削除してもよろしいですか？
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							キャンセル
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							削除
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="sm:max-w-[550px]">
					<DialogHeader>
						<DialogTitle>鑑賞記録の編集</DialogTitle>
					</DialogHeader>
					{recordToEdit && (
						<RecordForm
							mode="edit"
							initialData={{
								id: recordToEdit.id,
								tmdbMovieId: recordToEdit.tmdbMovieId,
								movieTitle: recordToEdit.movieTitle,
								watchDate: new Date(recordToEdit.watchDate),
								rating: recordToEdit.rating,
								review: recordToEdit.review,
								isPublic: recordToEdit.isPublic,
								venue: recordToEdit.venue,
							}}
							onSuccess={() => setIsEditDialogOpen(false)}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
