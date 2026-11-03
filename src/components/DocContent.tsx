"use client";

import React, { useState } from "react";
import {
	AlertTriangle,
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronRight,
	Copy,
	Info,
	Lightbulb,
	Terminal
} from "lucide-react";

import { DOC_SECTIONS, DocSection } from "../data/docsContent";

interface DocContentProps {
	section: DocSection;
	onNavigate: (id: string) => void;
}

export const DocContent: React.FC<DocContentProps> = ({
	section,
	onNavigate
}) => {
	const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

	const handleCopy = (code: string, id: string) => {
		navigator.clipboard.writeText(code);
		setCopiedSnippet(id);
		setTimeout(() => setCopiedSnippet(null), 2000);
	};

	// Determine previous and next sections for footer navigation
	const currentIndex = DOC_SECTIONS.findIndex((s) => s.id === section.id);
	const prevSection = currentIndex > 0 ? DOC_SECTIONS[currentIndex - 1] : null;
	const nextSection =
		currentIndex < DOC_SECTIONS.length - 1
			? DOC_SECTIONS[currentIndex + 1]
			: null;

	return (
		<article className="max-w-4xl mx-auto py-8 px-4 sm:px-8 lg:py-12 space-y-10 font-sans">
			{/* Breadcrumbs */}
			<div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
				<span>Documentation</span>
				<ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
				<span className="text-zinc-400">{section.category}</span>
				<ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
				<span className="text-cyan-400 font-semibold">{section.title}</span>
			</div>

			{/* Main Title & Summary */}
			<header className="space-y-3 pb-6 border-b border-zinc-800/80">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
						{section.title}
					</h1>
					{section.badge && (
						<span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
							{section.badge}
						</span>
					)}
				</div>
				<p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
					{section.summary}
				</p>
			</header>

			{/* Section Content Blocks */}
			<div className="space-y-10">
				{section.content.map((block, idx) => (
					<section key={idx} className="space-y-4">
						{block.heading && (
							<h2 className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight pt-2">
								{block.heading}
							</h2>
						)}

						{block.paragraphs &&
							block.paragraphs.map((p, pIdx) => (
								<p key={pIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
									{p}
								</p>
							))}

						{/* Callout Box */}
						{block.callout && (
							<div
								className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex gap-3 ${
									block.callout.type === "tip"
										? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
										: block.callout.type === "warning"
										? "bg-amber-950/20 border-amber-500/30 text-amber-200"
										: "bg-cyan-950/20 border-cyan-500/30 text-cyan-200"
								}`}
							>
								<div className="shrink-0 mt-0.5">
									{block.callout.type === "tip" ? (
										<Lightbulb className="w-5 h-5 text-emerald-400" />
									) : block.callout.type === "warning" ? (
										<AlertTriangle className="w-5 h-5 text-amber-400" />
									) : (
										<Info className="w-5 h-5 text-cyan-400" />
									)}
								</div>
								<div>
									<div className="font-semibold text-white mb-1">
										{block.callout.title}
									</div>
									<div className="text-zinc-300">{block.callout.text}</div>
								</div>
							</div>
						)}

						{/* Code Block */}
						{block.codeBlock && (
							<div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-lg shadow-black/40">
								{block.codeBlock.title && (
									<div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/60 text-xs">
										<div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
											<Terminal className="w-3.5 h-3.5 text-cyan-400" />
											<span>{block.codeBlock.title}</span>
										</div>
										<button
											type="button"
											onClick={() =>
												handleCopy(
													block.codeBlock!.code,
													`${idx}-main`
												)
											}
											className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
										>
											{copiedSnippet === `${idx}-main` ? (
												<>
													<Check className="w-3.5 h-3.5 text-emerald-400" />
													<span className="text-emerald-400 font-medium">
														Copied!
													</span>
												</>
											) : (
												<>
													<Copy className="w-3.5 h-3.5" />
													<span>Copy</span>
												</>
											)}
										</button>
									</div>
								)}
								<pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed select-all">
									<code>{block.codeBlock.code}</code>
								</pre>
							</div>
						)}

						{/* Data Table */}
						{block.table && (
							<div className="rounded-xl border border-zinc-800 overflow-hidden shadow-sm">
								<div className="overflow-x-auto">
									<table className="w-full text-left text-xs">
										<thead className="bg-zinc-900/80 text-zinc-300 font-semibold uppercase text-[10px] tracking-wider border-b border-zinc-800">
											<tr>
												{block.table.headers.map((h, hIdx) => (
													<th key={hIdx} className="px-4 py-3">
														{h}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-normal">
											{block.table.rows.map((row, rIdx) => (
												<tr
													key={rIdx}
													className={
														rIdx % 2 === 0
															? "bg-zinc-950/40 hover:bg-zinc-900/30 transition-colors"
															: "bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
													}
												>
													{row.map((cell, cIdx) => (
														<td key={cIdx} className="px-4 py-3 align-top leading-relaxed">
															{cell}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

						{/* Subsections */}
						{block.subsections && (
							<div className="space-y-6 pt-2">
								{block.subsections.map((sub, sIdx) => (
									<div key={sIdx} className="space-y-3">
										<h3 className="text-sm sm:text-base font-semibold text-cyan-300">
											{sub.title}
										</h3>
										{sub.content.map((p, spIdx) => (
											<p key={spIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
												{p}
											</p>
										))}
										{sub.codeBlock && (
											<div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-md">
												{sub.codeBlock.title && (
													<div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/60 text-xs">
														<span className="text-[11px] font-mono text-zinc-400">
															{sub.codeBlock.title}
														</span>
														<button
															type="button"
															onClick={() =>
																handleCopy(
																	sub.codeBlock!.code,
																	`${idx}-${sIdx}`
																)
															}
															className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded hover:bg-zinc-800"
														>
															{copiedSnippet === `${idx}-${sIdx}` ? (
																<>
																	<Check className="w-3.5 h-3.5 text-emerald-400" />
																	<span className="text-emerald-400 font-medium">
																		Copied!
																	</span>
																</>
															) : (
																<>
																	<Copy className="w-3.5 h-3.5" />
																	<span>Copy</span>
																</>
															)}
														</button>
													</div>
												)}
												<pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto leading-relaxed select-all">
													<code>{sub.codeBlock.code}</code>
												</pre>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</section>
				))}
			</div>

			{/* Pagination Footer */}
			<div className="pt-10 border-t border-zinc-800/80 flex items-center justify-between gap-4">
				{prevSection ? (
					<button
						type="button"
						onClick={() => onNavigate(prevSection.id)}
						className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs transition-colors"
					>
						<ArrowLeft className="w-4 h-4 text-cyan-400" />
						<div className="text-left">
							<div className="text-[10px] text-zinc-500 uppercase font-semibold">
								Previous
							</div>
							<div className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
								{prevSection.title}
							</div>
						</div>
					</button>
				) : (
					<div />
				)}

				{nextSection && (
					<button
						type="button"
						onClick={() => onNavigate(nextSection.id)}
						className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs transition-colors ml-auto"
					>
						<div className="text-right">
							<div className="text-[10px] text-zinc-500 uppercase font-semibold">
								Next
							</div>
							<div className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
								{nextSection.title}
							</div>
						</div>
						<ArrowRight className="w-4 h-4 text-cyan-400" />
					</button>
				)}
			</div>
		</article>
	);
};

export default DocContent;
