"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignOutButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignOut() {
		try {
			setIsLoading(true);

			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						toast.success("ログアウトしました");
						router.push("/sign-in");
						router.refresh();
					},
					onError: (error) => {
						console.error("ログアウトエラー:", error);
						toast.error("ログアウトに失敗しました", {
							description: "再度お試しください",
						});
					},
				},
			});
		} catch (error) {
			console.error("予期せぬエラー:", error);
			toast.error("エラーが発生しました", {
				description: "しばらく経ってからお試しください",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Button onClick={handleSignOut} disabled={isLoading}>
			{isLoading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					ログアウト中...
				</>
			) : (
				<>
					<LogOut className="mr-2 h-4 w-4" />
					ログアウト
				</>
			)}
		</Button>
	);
}
//
