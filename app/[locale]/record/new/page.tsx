"use client";

import { RecordForm } from "@/components/record-form";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewRecordPage() {
	const { data: session, isPending, error } = authClient.useSession();
	const router = useRouter();

	if (isPending) {
		return (
			<div className="container mx-auto py-10">
				<div className="flex justify-center items-center min-h-[300px]">
					<p className="text-muted-foreground">ログイン情報を読み込み中...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto py-10">
				<div className="flex flex-col justify-center items-center min-h-[300px] space-y-4">
					<h1 className="text-2xl font-bold">ログインが必要です</h1>
					<p className="text-muted-foreground">
						鑑賞記録を作成するにはログインしてください。
					</p>
					<Button onClick={() => router.push("/auth/signin")}>ログイン</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<div className="flex items-center mb-6">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.back()}
					className="mr-2"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h1 className="text-3xl font-bold">新しい鑑賞記録</h1>
			</div>

			<div className="max-w-2xl mx-auto">
				<RecordForm
					mode="create"
					userId={session?.user?.id}
					onSuccess={() => router.push("/record")}
				/>
			</div>
		</div>
	);
}
