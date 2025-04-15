"use client";
import { useState } from "react";

type Props = {
	text: string;
};

export const ReadMore = ({ text }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const isLong = text.length > 500;

	return (
		<div className="border rounded-md bg-muted p-3 my-6">
			<p className={`${!isExpanded && isLong ? "line-clamp-3" : ""}`}>{text}</p>
			{isLong && (
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-blue-500 hover:text-blue-700 text-sm mt-2"
				>
					{isExpanded ? "Read less" : "Read more..."}
				</button>
			)}
		</div>
	);
};
