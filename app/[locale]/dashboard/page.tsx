import { SignOutButton } from "@/components/auth/sign-out-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

import { db } from "@/actions/db";
import { RecordList } from "@/components/record-list";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getMovieTitle } from "../record/page";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/");
	}

	const records = await db.record.findMany({
		where: {
			userId: session.user.id,
		},
		select: {
			id: true,
			userId: true,
			tmdbMovieId: true,
			watchDate: true,
			rating: true,
			review: true,
			isPublic: true,
			venue: true,
			createdAt: true,
			updatedAt: true,
		},
		orderBy: {
			watchDate: "desc",
		},
	});

	// Enrich records with movie titles
	const recordsWithTitles = await Promise.all(
		records.map(async (record) => {
			const movieTitle = await getMovieTitle(record.tmdbMovieId);
			return {
				...record,
				movieTitle,
				// Convert dates to strings for the component
				watchDate: record.watchDate.toISOString(),
				createdAt: record.createdAt.toISOString(),
				updatedAt: record.updatedAt.toISOString(),
			};
		}),
	);

	return (
		<div>
			<div className="mx-auto mt-20 max-w-3xl">
				<h1 className="font-bold text-2xl">Dashboard</h1>
				<Card className="my-10 w-full shadow-lg">
					<CardHeader className="flex flex-row items-center gap-4 pb-2">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src={session.user.image || ""}
								alt={session.user.name}
							/>
							<AvatarFallback className="bg-primary text-lg text-primary-foreground">
								{session.user.name
									.split(" ")
									.map((part) => part.charAt(0))
									.join("")
									.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<CardTitle className="text-xl">{session.user.name}</CardTitle>
							<p className="text-muted-foreground text-sm">
								{session.user.email}
							</p>
							{session.user.emailVerified ? (
								<Badge className="mt-1 w-fit">メール認証済み</Badge>
							) : (
								<Badge variant="destructive" className="mt-1 w-fit">
									未認証
								</Badge>
							)}
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="grid grid-cols-3 gap-1 py-1 text-sm">
								<span className="text-muted-foreground">ユーザーID</span>
								<span className="col-span-2 truncate font-mono text-xs">
									{session.user.id}
								</span>
							</div>
							<div className="grid grid-cols-3 gap-1 py-1 text-sm">
								<span className="text-muted-foreground">アカウント作成</span>
								<span className="col-span-2">
									{format(session.user.createdAt, "yyyy/MM/dd")}
								</span>
							</div>
							<div className="grid grid-cols-3 gap-1 py-1 text-sm">
								<span className="text-muted-foreground">最終更新</span>
								<span className="col-span-2">
									{format(session.user.updatedAt, "yyyy/MM/dd")}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<SignOutButton />
			</div>
			<RecordList records={recordsWithTitles} />
		</div>
	);
}
