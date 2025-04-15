"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { type SignInFormValues, signInSchema } from "@/schemas/auth";
import type { ErrorContext } from "@better-fetch/fetch";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: SignInFormValues) {
		try {
			setIsLoading(true);

			await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
				},
				{
					onSuccess: async () => {
						toast.success("ログインしました", {
							description: "ダッシュボードにリダイレクトします",
						});
						router.push("/dashboard");
						router.refresh();
					},
					onError: (ctx: ErrorContext) => {
						toast.error("ログインに失敗しました", {
							description: ctx.error.message || "認証情報をご確認ください",
						});
					},
				},
			);
		} catch (error) {
			console.error("予期せぬエラー:", error);
			toast.error("予期せぬエラーが発生しました", {
				description: "しばらく経ってからお試しください",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex grow items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-center font-bold text-3xl text-gray-800">
						ログイン
					</CardTitle>
					<CardDescription className="text-center">
						アカウントにログインしてください
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>メールアドレス</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="example@example.com"
												{...field}
												autoComplete="email"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>パスワード</FormLabel>
											<Link
												href="/forgot-password"
												className="text-primary text-xs hover:underline"
											>
												パスワードをお忘れですか？
											</Link>
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="••••••••"
												{...field}
												autoComplete="current-password"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										ログイン中...
									</>
								) : (
									"ログイン"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-muted-foreground text-sm">
						アカウントをお持ちでない場合は
						<Link href="/sign-up" className="ml-1 text-primary hover:underline">
							新規登録
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
