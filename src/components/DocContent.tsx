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
	Play,
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
		<article className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:py-10 space-y-8 sm:space-y-10 font-sans text-zinc-800">
			{/* Breadcrumbs */}
			<div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 font-medium">
				<span>Docs</span>
				<ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
				<span className="text-zinc-600 truncate max-w-[120px] sm:max-w-none">{section.category}</span>
				<ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
				<span className="text-cyan-700 font-semibold truncate max-w-[180px] sm:max-w-none">{section.title}</span>
			</div>

			{/* Main Title & Summary */}
			<header className="space-y-3 pb-6 border-b border-zinc-200">
				<div className="flex flex-wrap items-center gap-2 sm:gap-3">
					<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900">
						{section.title}
					</h1>
					{section.badge && (
						<span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 whitespace-nowrap">
							{section.badge}
						</span>
					)}
				</div>
				<p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
					{section.summary}
				</p>
			</header>

			{/* Video Embed (Hero Demonstration) */}
			{section.videoEmbed && (
				<div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3.5 sm:p-5 space-y-3.5 shadow-xs">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2.5">
							<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600">
								<Play className="h-3.5 w-3.5 fill-red-600 text-red-600" />
							</div>
							<div>
								<h2 className="text-sm font-semibold text-zinc-900 tracking-tight">
									{section.videoEmbed.title}
								</h2>
							</div>
						</div>
						<span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700">
							Live Walkthrough
						</span>
					</div>

					<div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
						<iframe
							className="absolute inset-0 w-full h-full"
							src={section.videoEmbed.src}
							title={section.videoEmbed.title || "YouTube video player"}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>

					{section.videoEmbed.description && (
						<p className="text-xs text-zinc-500 leading-relaxed px-1">
							{section.videoEmbed.description}
						</p>
					)}
				</div>
			)}

			{/* Section Content Blocks */}
			<div className="space-y-10">
				{section.content.map((block, idx) => (
					<section key={idx} className="space-y-4">
						{block.heading && (
							<h2 className="text-lg sm:text-xl font-semibold text-zinc-900 tracking-tight pt-2">
								{block.heading}
							</h2>
						)}

						{block.paragraphs &&
							block.paragraphs.map((p, pIdx) => (
								<p key={pIdx} className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
									{p}
								</p>
							))}

						{/* In-block Video Embed */}
						{block.videoEmbed && (
							<div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3.5 sm:p-5 space-y-3 shadow-xs">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600">
											<Play className="h-3.5 w-3.5 fill-red-600 text-red-600" />
										</div>
										<h3 className="text-sm font-semibold text-zinc-900">
											{block.videoEmbed.title}
										</h3>
									</div>
									<span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700">
										Demo Video
									</span>
								</div>
								<div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
									<iframe
										className="absolute inset-0 w-full h-full"
										src={block.videoEmbed.src}
										title={block.videoEmbed.title || "YouTube video player"}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									/>
								</div>
								{block.videoEmbed.description && (
									<p className="text-xs text-zinc-500 leading-relaxed px-1">
										{block.videoEmbed.description}
									</p>
								)}
							</div>
						)}

						{/* Callout Box */}
						{block.callout && (
							<div
								className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex gap-3 ${
									block.callout.type === "tip"
										? "bg-emerald-50 border-emerald-200 text-emerald-900"
										: block.callout.type === "warning"
										? "bg-amber-50 border-amber-200 text-amber-900"
										: "bg-cyan-50 border-cyan-200 text-cyan-900"
								}`}
							>
								<div className="shrink-0 mt-0.5">
									{block.callout.type === "tip" ? (
										<Lightbulb className="w-5 h-5 text-emerald-600" />
									) : block.callout.type === "warning" ? (
										<AlertTriangle className="w-5 h-5 text-amber-600" />
									) : (
										<Info className="w-5 h-5 text-cyan-600" />
									)}
								</div>
								<div>
									<div className="font-semibold text-zinc-900 mb-1">
										{block.callout.title}
									</div>
									<div className="text-zinc-700">{block.callout.text}</div>
								</div>
							</div>
						)}

						{/* Code Block */}
						{block.codeBlock && (
							<div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
								{block.codeBlock.title && (
									<div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900 text-xs">
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
							<div className="rounded-xl border border-zinc-200 overflow-hidden shadow-2xs">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[540px] text-left text-xs">
										<thead className="bg-zinc-100 text-zinc-700 font-semibold uppercase text-[10px] tracking-wider border-b border-zinc-200">
											<tr>
												{block.table.headers.map((h, hIdx) => (
													<th key={hIdx} className="px-3.5 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">
														{h}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="divide-y divide-zinc-200 text-zinc-700 font-normal">
											{block.table.rows.map((row, rIdx) => (
												<tr
													key={rIdx}
													className={
														rIdx % 2 === 0
															? "bg-white hover:bg-zinc-50 transition-colors"
															: "bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
													}
												>
													{row.map((cell, cIdx) => (
														<td key={cIdx} className="px-3.5 py-2.5 sm:px-4 sm:py-3 align-top leading-relaxed">
															{cell}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="sm:hidden px-3 py-1.5 bg-zinc-50 border-t border-zinc-200 text-[10px] text-zinc-400 text-right">
									Scroll horizontally to view full table &rarr;
								</div>
							</div>
						)}

						{/* Subsections */}
						{block.subsections && (
							<div className="space-y-6 pt-2">
								{block.subsections.map((sub, sIdx) => (
									<div key={sIdx} className="space-y-3">
										<h3 className="text-sm sm:text-base font-semibold text-cyan-800">
											{sub.title}
										</h3>
										{sub.content.map((p, spIdx) => (
											<p key={spIdx} className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
												{p}
											</p>
										))}
										{sub.codeBlock && (
											<div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
												{sub.codeBlock.title && (
													<div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900 text-xs">
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
			<div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
				{prevSection ? (
					<button
						type="button"
						onClick={() => onNavigate(prevSection.id)}
						className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs transition-colors shadow-2xs w-full sm:w-auto"
					>
						<ArrowLeft className="w-4 h-4 text-cyan-600 shrink-0" />
						<div className="text-left min-w-0">
							<div className="text-[10px] text-zinc-400 uppercase font-semibold">
								Previous
							</div>
							<div className="font-medium truncate max-w-[200px] sm:max-w-[180px] lg:max-w-[240px] text-zinc-900">
								{prevSection.title}
							</div>
						</div>
					</button>
				) : (
					<div className="hidden sm:block" />
				)}

				{nextSection && (
					<button
						type="button"
						onClick={() => onNavigate(nextSection.id)}
						className="flex items-center justify-between sm:justify-end gap-2.5 px-3.5 py-2.5 rounded-lg border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs transition-colors sm:ml-auto shadow-2xs w-full sm:w-auto"
					>
						<div className="text-left sm:text-right min-w-0">
							<div className="text-[10px] text-zinc-400 uppercase font-semibold">
								Next
							</div>
							<div className="font-medium truncate max-w-[200px] sm:max-w-[180px] lg:max-w-[240px] text-zinc-900">
								{nextSection.title}
							</div>
						</div>
						<ArrowRight className="w-4 h-4 text-cyan-600 shrink-0" />
					</button>
				)}
			</div>
		</article>
	);
};

export default DocContent;
