import { db } from "@/actions/db";
import { RecordList } from "@/components/record-list";
import { getMovie } from "@/lib/tmdb/movie";

// Function to fetch movie title from TMDB API
// This is a placeholder - you'll need to implement this using your TMDB API key
export async function getMovieTitle(id: number): Promise<string> {
	const movie = await getMovie.details(id.toString());

	return movie ? movie.title : `映画 ID: ${id}`;
}

export default async function RecordsPage() {
	const records = await db.record.findMany({
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
		<>
			<h1 className="text-3xl font-bold mb-6">映画鑑賞記録</h1>
			<RecordList records={recordsWithTitles} />
		</>
	);
}
