import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "#/components/button";
import { LinkCard } from "#/components/link-card";
import { getLinksFn } from "#/utils/links.functions";

export const Route = createFileRoute("/manage")({
	component: Manage,
});

function Manage() {
	const [links, setLinks] = useState<{ id: string; linksTo: string }[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		setOrigin(window.location.origin);
		const fetchLinks = async () => {
			const token = localStorage.getItem("plink-token");
			if (token) {
				try {
					const data = await getLinksFn({ data: { token } });
					setLinks(data);
				} catch (error) {
					console.error("Failed to fetch links", error);
				}
			}
			setIsLoading(false);
		};

		fetchLinks();
	}, []);

	return (
		<div className="min-h-screen bg-white p-6 md:p-12 font-mono text-neutral-900 selection:bg-neutral-200">
			<header className="mb-20 flex items-center justify-between">
				<div className="max-w-4xl">
					<h1 className="text-4xl font-medium tracking-tight lowercase">
						manage
					</h1>
					<p className="text-sm mt-2 text-neutral-500 uppercase tracking-widest">
						your shortened links
					</p>
				</div>
				<Button as="link" to="/" variant="ghost">
					Back
				</Button>
			</header>

			<main className="max-w-4xl">
				{isLoading ? (
					<p className="text-neutral-400 animate-pulse">Loading links...</p>
				) : links.length > 0 ? (
					<div className="grid gap-8">
						{links.map((link) => (
							<LinkCard
								key={link.id}
								id={link.id}
								linksTo={link.linksTo}
								origin={origin}
							/>
						))}
					</div>
				) : (
					<div className="border border-neutral-100 p-12 text-center">
						<p className="text-neutral-400 uppercase tracking-widest text-sm mb-8">
							No links found for your current session
						</p>
						<Button as="link" to="/">
							Create your first link
						</Button>
					</div>
				)}
			</main>
		</div>
	);
}
