import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "#/components/button";
import { getLink } from "#/utils/links.functions";

export const Route = createFileRoute("/go/$linkId")({
	loader: async ({ params }) => {
		const linkInfo = await getLink({ data: { id: params.linkId } });

		if (!linkInfo?.linksTo) {
			throw redirect({
				to: "/",
				headers: {
					"x-error": "Link not found or has expired",
				},
			});
		}

		return linkInfo;
	},
	component: Redirector,
});

function Redirector() {
	const linkInfo = Route.useLoaderData();
	const [cancelled, setCancelled] = useState(false);

	useEffect(() => {
		if (!linkInfo?.linksTo || cancelled) return;

		const timeout = setTimeout(() => {
			window.location.href = linkInfo.linksTo;
		}, 3000);

		return () => clearTimeout(timeout);
	}, [linkInfo, cancelled]);

	return (
		<div className="min-h-screen bg-white p-6 md:p-12 font-mono text-neutral-900 flex flex-col items-center justify-center">
			<main className="max-w-xl w-full border border-neutral-200 p-8 md:p-12 shadow-sm">
				<h1 className="text-3xl font-medium lowercase mb-8 tracking-tight">
					{cancelled ? "redirect stopped" : "redirecting..."}
				</h1>

				<div className="bg-neutral-50 border-l-2 border-neutral-900 p-6 mb-12">
					<p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
						{cancelled
							? "the automatic redirect has been cancelled."
							: "you are being sent to:"}
					</p>
					<a
						className="text-lg font-medium break-all underline decoration-1 underline-offset-4 hover:text-neutral-500 transition-colors"
						href={linkInfo?.linksTo}
					>
						{linkInfo?.linksTo}
					</a>
				</div>

				<div className="flex flex-col gap-4">
					{!cancelled && (
						<Button
							as="button"
							className="w-full p-4"
							onClick={() => setCancelled(true)}
						>
							Cancel
						</Button>
					)}

					{cancelled && (
						<Button as="link" to="/" className="w-full p-4">
							Back to Home
						</Button>
					)}
				</div>
			</main>
		</div>
	);
}
