import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { Button } from "#/components/button";
import { createLinkFn } from "#/utils/links.functions";

const getErrorFromHeader = createServerFn({ method: "GET" }).handler(
	async () => {
		return getRequestHeader("x-error") || null;
	},
);

export const Route = createFileRoute("/")({
	loader: async () => {
		const error = await getErrorFromHeader();
		return { error };
	},
	component: Home,
});

function Home() {
	const { error } = Route.useLoaderData();

	const [url, setUrl] = useState("");
	const [createdLink, setCreatedLink] = useState<{
		id: string;
		token: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const token = localStorage.getItem("plink-token");
			const result = await createLinkFn({
				data: { linksTo: url, token: token || undefined },
			});
			setCreatedLink(result);
			localStorage.setItem("plink-token", result.token);
			setUrl("");
		} catch (error) {
			console.error(error);
			alert("Failed to create link");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white p-6 md:p-12 font-mono text-neutral-900 selection:bg-neutral-200">
			<header className="mb-20 max-w-2xl flex items-start justify-between">
				<div>
					<h1 className="text-4xl font-medium tracking-tight lowercase">
						plink
					</h1>
					<p className="text-sm mt-2 text-neutral-500 uppercase tracking-widest">
						Minimal link utility
					</p>
				</div>
				<Button as="link" to="/manage" variant="ghost">
					Manage
				</Button>
			</header>

			<main className="max-w-2xl">
				{error && (
					<div className="border border-neutral-200 p-4 mb-12 bg-neutral-50 flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-red-500" />
						<p className="text-sm font-medium">{error}</p>
					</div>
				)}

				<section className="mb-20">
					<form onSubmit={handleSubmit} className="flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="url"
								className="text-xs uppercase tracking-widest text-neutral-500"
							>
								Destination URL
							</label>
							<input
								id="url"
								type="url"
								required
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://..."
								className="w-full border-b border-neutral-200 py-3 text-lg focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-300"
							/>
						</div>
						<Button type="submit" loading={isLoading} className="self-start">
							Shorten
						</Button>
					</form>
				</section>

				{createdLink && (
					<section className="border border-neutral-900 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
						<h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
							Result
						</h2>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between border-b border-neutral-200 py-2">
									<span className="text-lg truncate mr-4 font-medium">
										{origin}/go/{createdLink.id}
									</span>
									<Button
										as="button"
										variant="ghost"
										onClick={() => {
											navigator.clipboard.writeText(
												`${origin}/go/${createdLink.id}`,
											);
											alert("Copied");
										}}
									>
										Copy
									</Button>
								</div>
							</div>
							<p className="text-[10px] text-neutral-400 uppercase tracking-tighter">
								Management token stored locally
							</p>
						</div>
					</section>
				)}
			</main>
		</div>
	);
}
