"use client";

import React from "react";
import {
	Activity,
	ExternalLink,
	Search,
	Shield,
	Terminal
} from "lucide-react";

// Inline GitHub SVG for clean, dependency-free rendering
const GithubIcon: React.FC<{ className?: string }> = ({
	className = "w-3.5 h-3.5"
}) => (
	<svg
		className={className}
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			clipRule="evenodd"
		/>
	</svg>
);

interface HeaderProps {
	searchQuery: string;
	setSearchQuery: (q: string) => void;
	onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
	searchQuery,
	setSearchQuery,
	onToggleMobileMenu
}) => {
	return (
		<header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Left: Brand & Mobile Toggle */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={onToggleMobileMenu}
						className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 lg:hidden"
						aria-label="Toggle Navigation"
					>
						<Terminal className="w-5 h-5" />
					</button>

					<div className="flex items-center gap-2.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-sm shadow-cyan-950/40">
							<Shield className="h-4 w-4" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<span className="font-semibold text-sm tracking-wide text-zinc-100">
									TSD Docs
								</span>
								<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700/60 font-medium">
									v1.0.0
								</span>
							</div>
							<p className="text-[10px] text-zinc-400 hidden sm:block">
								Tactical Situation Display Architecture & Guide
							</p>
						</div>
					</div>
				</div>

				{/* Center: Search Bar */}
				<div className="flex-1 max-w-md mx-4 hidden md:block">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
						<input
							type="text"
							placeholder="Search architecture, WebGL, APIs, Go backend..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
							>
								✕
							</button>
						)}
					</div>
				</div>

				{/* Right: Status Pills & GitHub Links */}
				<div className="flex items-center gap-2.5">
					{/* Service Status */}
					<div className="hidden xl:flex items-center gap-2 text-[11px] font-mono">
						<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300">
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
							FE :8123
						</span>
						<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
							<span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
							BE :8080
						</span>
					</div>

					{/* GitHub Repositories Dropdown/Buttons */}
					<div className="flex items-center gap-1.5">
						<a
							href="https://github.com/fredli4qooni/fe-track-rendering-tsd.git"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
							title="Frontend GitHub Repository"
						>
							<GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
							<span className="hidden sm:inline">Frontend</span>
							<ExternalLink className="w-3 h-3 text-zinc-500" />
						</a>

						<a
							href="https://github.com/fredli4qooni/be-track-rendering-tsd.git"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
							title="Backend GitHub Repository"
						>
							<GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
							<span className="hidden sm:inline">Backend</span>
							<ExternalLink className="w-3 h-3 text-zinc-500" />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
