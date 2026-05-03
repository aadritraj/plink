import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white p-6 font-mono text-neutral-900 selection:bg-neutral-200">
			<div className="max-w-2xl w-full text-center">
				<header className="mb-16">
					<h1 className="text-[12rem] md:text-[20rem] font-bold tracking-tighter text-neutral-200 leading-none select-none">
						404
					</h1>
					<div className="-mt-8 md:-mt-12">
						<h2 className="text-xl font-medium tracking-tight lowercase">
							Not Found
						</h2>
						<p className="text-xs mt-4 text-neutral-500 uppercase tracking-widest">
							The requested resource is missing
						</p>
					</div>
				</header>

				<Link
					to="/"
					className="inline-block px-8 py-3 border border-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
}
