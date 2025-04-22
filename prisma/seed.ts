import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
	console.log("Start seeding...");

	// Clear existing data to avoid conflicts
	try {
		console.log("Cleaning up existing data...");
		await prisma.record.deleteMany({});
		await prisma.session.deleteMany({});
		await prisma.account.deleteMany({});
		await prisma.passkey.deleteMany({});
		await prisma.verification.deleteMany({});
		await prisma.user.deleteMany({});
		console.log("Data cleanup complete");
	} catch (error) {
		console.log("Error during cleanup:", error);
		// Continue with seeding even if cleanup fails
	}

	// Create 3 users
	const userIds = [];
	const userNames = ["佐藤健太", "鈴木さくら", "田中雄太"];
	const userEmails = [
		"kentasato@example.com",
		"sakura@example.com",
		"tanaka@example.com",
	];

	for (let i = 0; i < 3; i++) {
		// Using UUID instead of argon2 hash for IDs
		const userId = uuidv4();

		try {
			const user = await prisma.user.create({
				data: {
					id: userId,
					name: userNames[i],
					email: userEmails[i],
					emailVerified: true,
					image: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});
			userIds.push(user.id);
			console.log(`Created user with id: ${user.id}`);

			// Create 1 session per user
			await prisma.session.create({
				data: {
					id: uuidv4(),
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
					token: `token-${i}`,
					createdAt: new Date(),
					updatedAt: new Date(),
					ipAddress: "127.0.0.1",
					userAgent: "Mozilla/5.0",
					userId: user.id,
				},
			});

			// Create 1 account per user
			const providers = ["google", "github", "twitter"];
			await prisma.account.create({
				data: {
					id: uuidv4(),
					accountId: `account-${i}`,
					providerId: providers[i],
					userId: user.id,
					accessToken: `access-token-${i}`,
					refreshToken: `refresh-token-${i}`,
					idToken: null,
					accessTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
					refreshTokenExpiresAt: null,
					scope: "email profile",
					password: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});
		} catch (error) {
			console.error(`Error creating user ${i}:`, error);
		}
	}

	// If no users were created, exit early
	if (userIds.length === 0) {
		console.error("No users were created. Cannot create movie records.");
		return;
	}

	// Real TMDB movie IDs and titles
	const movies = [
		{ id: 372058, title: "君の名は。" },
		{ id: 635302, title: "劇場版「鬼滅の刃」無限列車編" },
		{ id: 505026, title: "シン・ゴジラ" },
		{ id: 324857, title: "スパイダーマン：スパイダーバース" },
		{ id: 155, title: "ダークナイト" },
		{ id: 299536, title: "アベンジャーズ/インフィニティ・ウォー" },
		{ id: 299534, title: "アベンジャーズ/エンドゲーム" },
		{ id: 399566, title: "ゴジラvsコング" },
		{ id: 129, title: "千と千尋の神隠し" },
	];

	// Japanese venues
	const venues = [
		"TOHOシネマズ",
		"イオンシネマ",
		"シネマシティ",
		"自宅",
		"映画祭",
		"飛行機内",
	];

	// Japanese reviews
	const reviews = [
		"素晴らしい映像美と音楽で心を揺さぶられました。何度見ても感動する作品です。",
		"ストーリー展開が予想外で、最後まで飽きることなく楽しめました。",
		"キャラクターの成長が見事に描かれていて、感情移入できました。",
		"期待していたほどではありませんでしたが、視覚効果は素晴らしかったです。",
		"傑作です。監督の世界観が完璧に表現されていました。",
		"アクションシーンが迫力満点で、何度見ても興奮します。",
		"ストーリーは単純ですが、演出と演技が素晴らしく、時間を忘れて観入ってしまいました。",
		"想像を超える展開に驚きました。続編が待ち遠しいです。",
		"CGは素晴らしかったですが、ストーリーにもう少し深みがあれば完璧だったと思います。",
	];

	// Create 3 records for each user (total 9 records)
	for (let i = 0; i < Math.min(3, userIds.length); i++) {
		for (let j = 0; j < 3; j++) {
			const movieIndex = i * 3 + j;
			if (movieIndex >= movies.length) continue;

			const movie = movies[movieIndex];

			// Calculate a date within the last 3 months
			const now = new Date();
			const randomDaysAgo = Math.floor(Math.random() * 90); // 0-90 days ago
			const watchDate = new Date(now);
			watchDate.setDate(now.getDate() - randomDaysAgo);

			try {
				await prisma.record.create({
					data: {
						userId: userIds[i],
						tmdbMovieId: movie.id,
						watchDate: watchDate,
						rating: Math.floor(Math.random() * 5) + 1, // 1-5 rating
						review: reviews[movieIndex],
						isPublic: Math.random() > 0.2, // 80% chance of being public
						venue: venues[Math.floor(Math.random() * venues.length)],
					},
				});

				console.log(
					`Created record for movie ${movie.title} for user ${i + 1}`,
				);
			} catch (error) {
				console.error(`Error creating record for movie ${movie.title}:`, error);
			}
		}
	}

	console.log("Seeding finished");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
