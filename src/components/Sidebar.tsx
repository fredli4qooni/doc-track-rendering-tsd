"use client";

import React from "react";
import {
	BookOpen,
	Code2,
	Layers,
	Server,
	ShieldCheck
} from "lucide-react";

import { DOC_SECTIONS } from "../data/docsContent";

interface SidebarProps {
	activeId: string;
	onSelect: (id: string) => void;
	searchQuery: string;
	isOpenMobile: boolean;
	onCloseMobile: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
	"Getting Started": <BookOpen className="w-4 h-4 text-cyan-600" />,
	"Frontend Engineering": <Layers className="w-4 h-4 text-amber-600" />,
	"Backend Architecture": <Server className="w-4 h-4 text-emerald-600" />,
	"API & Protocols": <Code2 className="w-4 h-4 text-indigo-600" />,
	"Quality & Governance": <ShieldCheck className="w-4 h-4 text-teal-600" />
};

export const Sidebar: React.FC<SidebarProps> = ({
	activeId,
	onSelect,
	searchQuery,
	isOpenMobile,
	onCloseMobile
}) => {
	// Filter sections if search query is provided
	const filteredSections = DOC_SECTIONS.filter((sec) => {
		if (!searchQuery) return true;
		const q = searchQuery.toLowerCase();
		return (
			sec.title.toLowerCase().includes(q) ||
			sec.summary.toLowerCase().includes(q) ||
			sec.category.toLowerCase().includes(q)
		);
	});

	// Group filtered sections by category
	const categories = Array.from(
		new Set(filteredSections.map((s) => s.category))
	);

	const sidebarContent = (
		<div className="flex flex-col h-full overflow-y-auto px-4 py-6 space-y-6">
			{categories.length === 0 ? (
				<div className="text-xs text-zinc-500 py-8 text-center">
					No documentation matches &quot;{searchQuery}&quot;
				</div>
			) : (
				categories.map((cat) => {
					const items = filteredSections.filter((s) => s.category === cat);
					return (
						<div key={cat} className="space-y-1.5">
							<div className="flex items-center gap-2 px-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
								{CATEGORY_ICONS[cat]}
								<span>{cat}</span>
							</div>

							<div className="space-y-0.5 pt-1">
								{items.map((item) => {
									const isActive = activeId === item.id;
									return (
										<button
											key={item.id}
											type="button"
											onClick={() => {
												onSelect(item.id);
												onCloseMobile();
											}}
											className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-all ${
												isActive
													? "bg-cyan-50 text-cyan-800 font-semibold border border-cyan-200 shadow-2xs"
													: "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 border border-transparent font-normal"
											}`}
										>
											<span className="truncate">{item.title}</span>
											<div className="flex items-center gap-1.5 ml-2 shrink-0">
												{item.videoEmbed && (
													<span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
														Video
													</span>
												)}
												{item.badge && (
													<span
														className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
															isActive
																? "bg-cyan-100 text-cyan-800 border border-cyan-200 font-medium"
																: "bg-zinc-200/70 text-zinc-600 font-normal"
														}`}
													>
														{item.badge}
													</span>
												)}
											</div>
										</button>
									);
								})}
							</div>
						</div>
					);
				})
			)}
		</div>
	);

	return (
		<>
			{/* Desktop Sticky Sidebar */}
			<aside className="hidden lg:block w-72 shrink-0 border-r border-zinc-200 bg-zinc-50/50 min-h-[calc(100vh-4rem)]">
				<div className="sticky top-16 h-[calc(100vh-4rem)]">
					{sidebarContent}
				</div>
			</aside>

			{/* Mobile Drawer */}
			{isOpenMobile && (
				<div className="fixed inset-0 z-50 flex lg:hidden">
					<div
						className="fixed inset-0 bg-black/40 backdrop-blur-xs"
						onClick={onCloseMobile}
					/>
					<div className="relative w-80 max-w-[85%] bg-white border-r border-zinc-200 h-full z-10 shadow-2xl">
						<div className="p-4 border-b border-zinc-200 flex items-center justify-between">
							<span className="font-semibold text-sm text-zinc-900">
								Documentation Index
							</span>
							<button
								type="button"
								onClick={onCloseMobile}
								className="text-zinc-500 hover:text-zinc-800 text-xs px-2 py-1 rounded hover:bg-zinc-100"
							>
								✕
							</button>
						</div>
						{sidebarContent}
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
