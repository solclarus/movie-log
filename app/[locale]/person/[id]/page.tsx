import { Filmography } from "@/components/filmography";
import { PersonHero } from "@/components/person-hero";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function PersonDetail({ params }: Props) {
	const { id } = await params;

	return (
		<div>
			<PersonHero id={id} />
			<Filmography id={id} />
		</div>
	);
}
