// // lib/record.ts
// import { prisma } from "@/lib/prisma";
// import type { Record } from "@prisma/client";

// // 型定義
// export type CreateRecordInput = {
//   userId: string;
//   tmdbMovieId: number;
//   watchDate: Date;
//   rating?: number;
//   review?: string;
//   isPublic?: boolean;
//   venue?: string;
// };

// export type UpdateRecordInput = Partial<
//   Omit<CreateRecordInput, "userId" | "tmdbMovieId">
// >;

// // 鑑賞記録の作成
// export async function createRecord(data: CreateRecordInput): Promise<Record> {
//   return prisma.record.create({
//     data: {
//       userId: data.userId,
//       tmdbMovieId: data.tmdbMovieId,
//       watchDate: data.watchDate,
//       rating: data.rating,
//       review: data.review,
//       isPublic: data.isPublic ?? true,
//       venue: data.venue,
//     },
//   });
// }

// // 鑑賞記録の取得（ID指定）
// export async function getRecordById(id: string): Promise<Record | null> {
//   return prisma.record.findUnique({
//     where: { id },
//   });
// }

// // ユーザーの鑑賞記録一覧を取得
// export async function getUserRecords(
//   userId: string,
//   options?: {
//     limit?: number;
//     offset?: number;
//     orderBy?: "watchDate" | "createdAt";
//     order?: "asc" | "desc";
//   },
// ): Promise<Record[]> {
//   const {
//     limit = 10,
//     offset = 0,
//     orderBy = "watchDate",
//     order = "desc",
//   } = options || {};

//   return prisma.record.findMany({
//     where: {
//       userId,
//     },
//     orderBy: {
//       [orderBy]: order,
//     },
//     skip: offset,
//     take: limit,
//   });
// }

// // 映画ごとの鑑賞記録一覧を取得
// export async function getMovieRecords(
//   tmdbMovieId: number,
//   options?: {
//     limit?: number;
//     offset?: number;
//     publicOnly?: boolean;
//   },
// ): Promise<Record[]> {
//   const { limit = 10, offset = 0, publicOnly = true } = options || {};

//   return prisma.record.findMany({
//     where: {
//       tmdbMovieId,
//       ...(publicOnly ? { isPublic: true } : {}),
//     },
//     orderBy: {
//       watchDate: "desc",
//     },
//     skip: offset,
//     take: limit,
//   });
// }

// // 鑑賞記録の更新
// export async function updateRecord(
//   id: string,
//   data: UpdateRecordInput,
// ): Promise<Record> {
//   return prisma.record.update({
//     where: { id },
//     data,
//   });
// }

// // 鑑賞記録の削除
// export async function deleteRecord(id: string): Promise<Record> {
//   return prisma.record.delete({
//     where: { id },
//   });
// }

// // ユーザーの鑑賞統計を取得
// export async function getUserStats(userId: string): Promise<{
//   totalWatched: number;
//   averageRating: number | null;
//   totalReviewed: number;
// }> {
//   const totalWatched = await prisma.record.count({
//     where: { userId },
//   });

//   const ratingStats = await prisma.record.aggregate({
//     where: {
//       userId,
//       rating: { not: null },
//     },
//     _avg: {
//       rating: true,
//     },
//     _count: {
//       rating: true,
//     },
//   });

//   return {
//     totalWatched,
//     averageRating: ratingStats._avg.rating,
//     totalReviewed: ratingStats._count.rating,
//   };
// }

// // ユーザーが映画を鑑賞済みかをチェック
// export async function hasUserWatchedMovie(
//   userId: string,
//   tmdbMovieId: number,
// ): Promise<boolean> {
//   const record = await prisma.record.findFirst({
//     where: {
//       userId,
//       tmdbMovieId,
//     },
//   });

//   return !!record;
// }

// // 特定期間の鑑賞記録を取得
// export async function getRecordsByDateRange(
//   userId: string,
//   startDate: Date,
//   endDate: Date,
// ): Promise<Record[]> {
//   return prisma.record.findMany({
//     where: {
//       userId,
//       watchDate: {
//         gte: startDate,
//         lte: endDate,
//       },
//     },
//     orderBy: {
//       watchDate: "asc",
//     },
//   });
// }
