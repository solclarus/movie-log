"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
	totalPages: number;
};

export function MoviePagination({ totalPages }: Props) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;

	if (totalPages <= 1) return null;

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const renderPageLinks = () => {
		const pageItems = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pageItems.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={createPageURL(i)}
							isActive={currentPage === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}
		} else {
			pageItems.push(
				<PaginationItem key={1}>
					<PaginationLink href={createPageURL(1)} isActive={currentPage === 1}>
						1
					</PaginationLink>
				</PaginationItem>,
			);
			if (currentPage > 3) {
				pageItems.push(
					<PaginationItem key="ellipsis-start">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) {
				pageItems.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={createPageURL(i)}
							isActive={currentPage === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			}

			// Show ellipsis if needed
			if (currentPage < totalPages - 2) {
				pageItems.push(
					<PaginationItem key="ellipsis-end">
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}

			// Always show last page
			pageItems.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href={createPageURL(totalPages)}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		return pageItems;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={createPageURL(Math.max(1, currentPage - 1))}
						aria-disabled={currentPage === 1}
					/>
				</PaginationItem>
				{renderPageLinks()}
				<PaginationItem>
					<PaginationNext
						href={createPageURL(Math.min(totalPages, currentPage + 1))}
						aria-disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
