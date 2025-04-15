import Image from "next/image";

type ImageType = {
	aspect_ratio: number;
	height: number;
	iso_639_1: string | null;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
};

type ImagesResponse = {
	backdrops?: ImageType[];
	logos?: ImageType[];
	posters?: ImageType[];
};

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
	},
};

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export async function MovieImages({ movieId = 365063 }: { movieId?: number }) {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/images`,
		options,
	);
	if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
	const data = await res.json();
	console.log(data);
	return (
		<div className="space-y-8">
			{["backdrops", "logos", "posters"].map((category) => {
				const categoryImages = data[category as keyof ImagesResponse] || []; // undefined の場合は空配列
				if (categoryImages.length === 0) return null; // 空なら表示しない

				return (
					<div key={category}>
						<h2 className="font-bold text-xl">{category.toUpperCase()}</h2>
						<div className="flex space-x-4 overflow-x-auto p-2">
							{categoryImages.map((img: ImageType) => (
								<Image
									key={img.file_path}
									src={`${TMDB_IMAGE_BASE_URL}${img.file_path}`}
									alt={img.file_path}
									width={img.width}
									height={img.height}
									className=" rounded-lg object-contain shadow"
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

type VideoType = {
	id: string;
	key: string;
	site: string;
	type: string;
	official: boolean;
};

type VideosResponse = {
	results: VideoType[];
};

export async function MovieVideos({ movieId = 365063 }: { movieId?: number }) {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ja-JP`,
		options,
	);
	if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
	const data: VideosResponse = await res.json();

	const videos = data.results.filter((video) => video.site === "YouTube"); // YouTube動画のみ取得
	if (videos.length === 0) return null;

	return (
		<div className="space-y-8">
			<h2 className="font-bold text-xl">VIDEOS</h2>
			<div className="flex space-x-4 overflow-x-auto p-2">
				{videos.map((video) => (
					<iframe
						key={video.id}
						src={`https://www.youtube.com/embed/${video.key}`}
						title={video.type}
						width="300"
						height="169" // 16:9の比率
						allowFullScreen
						className="rounded-lg shadow"
					/>
				))}
			</div>
		</div>
	);
}
