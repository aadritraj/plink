import { Button } from "#/components/button";

interface LinkCardProps {
	id: string;
	linksTo: string;
	origin: string;
}

export function LinkCard({ id, linksTo, origin }: LinkCardProps) {
	return (
		<div className="border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neutral-900 transition-colors">
			<div className="flex flex-col gap-2 min-w-0">
				<div className="flex items-center gap-2">
					<span className="text-xs uppercase tracking-widest text-neutral-400">
						Short
					</span>
					<a
						href={`/go/${id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-lg font-medium hover:underline truncate"
					>
						{origin}/go/{id}
					</a>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xs uppercase tracking-widest text-neutral-400">
						Target
					</span>
					<span className="text-sm text-neutral-600 truncate">{linksTo}</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Button
					as="button"
					variant="ghost"
					onClick={() => {
						navigator.clipboard.writeText(`${origin}/go/${id}`);
						alert("Copied short link");
					}}
				>
					Copy
				</Button>
			</div>
		</div>
	);
}
