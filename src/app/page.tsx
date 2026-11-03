"use client";

import React, { useEffect, useState } from "react";

import DocContent from "../components/DocContent";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { DOC_SECTIONS } from "../data/docsContent";

export default function Home() {
	const [activeId, setActiveId] = useState<string>("overview");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

	// Sync active ID with URL hash on initial mount and hash changes
	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.replace("#", "");
			if (hash && DOC_SECTIONS.some((s) => s.id === hash)) {
				setActiveId(hash);
			}
		};

		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	const handleSelectSection = (id: string) => {
		setActiveId(id);
		window.location.hash = id;
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const currentSection =
		DOC_SECTIONS.find((s) => s.id === activeId) ?? DOC_SECTIONS[0];

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
			{/* Top Header */}
			<Header
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onToggleMobileMenu={() => setIsOpenMobile(true)}
			/>

			{/* Main Layout Area */}
			<div className="flex-1 flex max-w-7xl w-full mx-auto">
				{/* Sidebar */}
				<Sidebar
					activeId={activeId}
					onSelect={handleSelectSection}
					searchQuery={searchQuery}
					isOpenMobile={isOpenMobile}
					onCloseMobile={() => setIsOpenMobile(false)}
				/>

				{/* Documentation Article Area */}
				<main className="flex-1 min-w-0 pb-16">
					<DocContent
						section={currentSection}
						onNavigate={handleSelectSection}
					/>
				</main>
			</div>
		</div>
	);
}
