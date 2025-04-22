"use server";

import { db } from "@/actions/db";
import type { Record } from "@/prisma/generated/zod/modelSchema/RecordSchema";
import { revalidatePath } from "next/cache";

type ActionResponse<T = void> = {
	success: boolean;
	data?: T;
	error?: string;
	statusCode?: number;
};

function handleError<T>(error: unknown, action: string): ActionResponse<T> {
	if (error instanceof Error) {
		return {
			success: false,
			error: `${action}処理でエラーが発生しました: ${error.message}`,
			statusCode: 500,
		};
	}
	return {
		success: false,
		error: "予期せぬエラーが発生しました",
		statusCode: 500,
	};
}

export async function fetchRecords(
	userId?: string,
): Promise<ActionResponse<Record[]>> {
	try {
		const whereClause = userId ? { userId } : undefined;

		const records = await db.record.findMany({
			where: whereClause,
			orderBy: {
				watchDate: "desc",
			},
		});

		return { success: true, data: records };
	} catch (error) {
		return handleError(error, "取得");
	}
}

export async function fetchRecordById(
	id: string,
): Promise<ActionResponse<Record>> {
	try {
		const record = await db.record.findUnique({
			where: { id },
		});

		if (!record) {
			return {
				success: false,
				error: "指定されたレコードが見つかりませんでした",
				statusCode: 404,
			};
		}

		return { success: true, data: record };
	} catch (error) {
		return handleError(error, "取得");
	}
}

export async function addRecord(
	data: Omit<Record, "id" | "createdAt" | "updatedAt">,
): Promise<ActionResponse<Record>> {
	try {
		const newRecord = await db.record.create({
			data,
		});

		revalidatePath("/record");
		return { success: true, data: newRecord };
	} catch (error) {
		return handleError(error, "作成");
	}
}

export async function updateRecord(
	id: string,
	data: Partial<Omit<Record, "id" | "createdAt" | "updatedAt">>,
): Promise<ActionResponse<Record>> {
	try {
		const updatedRecord = await db.record.update({
			where: { id },
			data,
		});

		revalidatePath("/record");
		return { success: true, data: updatedRecord };
	} catch (error) {
		return handleError(error, "更新");
	}
}

export async function removeRecord(id: string): Promise<ActionResponse> {
	try {
		await db.record.delete({
			where: { id },
		});

		revalidatePath("/record");
		return { success: true };
	} catch (error) {
		return handleError(error, "削除");
	}
}

export async function toggleRecordPublicity(
	id: string,
	isPublic: boolean,
): Promise<ActionResponse<Record>> {
	try {
		const updatedRecord = await db.record.update({
			where: { id },
			data: { isPublic },
		});

		revalidatePath("/record");
		return { success: true, data: updatedRecord };
	} catch (error) {
		return handleError(error, "公開設定の更新");
	}
}
