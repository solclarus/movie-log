import { ReviewList } from "@/components/review-list";

export default function Record() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">映画レビュー一覧</h1>
			<ReviewList />
		</div>
	);
}
