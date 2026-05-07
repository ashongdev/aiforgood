import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { BracketList } from "./components/BracketList";
import { CategoryToggle } from "./components/CategoryToggle";
import { MatchDetailView } from "./components/MatchDetailView";
import { PhaseNavigation } from "./components/PhaseNavigation";
import { BRACKETS } from "./data/brackets";
import { useEffects } from "./hooks/useEffects";

export default function App() {
	const [currentPhase, setCurrentPhase] = useState(0);
	const [category, setCategory] = useState<"junior" | "senior">("junior");
	const [selectedMatch, setSelectedMatch] = useState<any>(null);
	const [shared, setShared] = useState(false);
	const { effects, triggerEffect } = useEffects();
	// const currentPhase = ""

	const PHASES = [
		{ phase: 0, sheetName: "PHASE_0" },
		{ phase: 1, sheetName: "PHASE_1" },
		{ phase: 2, sheetName: "PHASE_2" },
		{ phase: 3, sheetName: "PHASE_3" },
	];
	const phase = PHASES.find((c) => c.phase === currentPhase);

	const fetchData = async () => {
		console.log("Hola", import.meta.env.VITE_SPREADSHEET_ID);
		if (!phase) return [];

		const response = new Promise((resolve, reject) => {
			gapi.load("client", () => {
				gapi.client
					.init({
						apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
						discoveryDocs: [
							"https://sheets.googleapis.com/$discovery/rest?version=v4",
						],
					})
					.then(() => {
						return (
							gapi.client as any
						).sheets.spreadsheets.values.get({
							spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
							range: `${phase.sheetName}!A2:I100`,
							valueRenderOption: "FORMATTED_VALUE",
						});
					})
					.then((response: any) => {
						const rows = response.result.values || [];
						if (rows.length < 2) return resolve([]);

						const headers = rows[0];
						const dataRows = rows.slice(1);

						const idxR1 = headers.findIndex(
							(h: string) =>
								h.includes("TOTAL") && h.includes("R1"),
						);
						const idxR2 = headers.findIndex(
							(h: string) =>
								h.includes("TOTAL") && h.includes("R2"),
						);
						const idxR3 = headers.findIndex(
							(h: string) =>
								h.includes("TOTAL") && h.includes("R3"),
						);
						const idxR1TimeLeft = headers.findIndex(
							(h: string) =>
								h.includes("R1") && h.includes("TIME LEFT"),
						);
						const idxR2TimeLeft = headers.findIndex(
							(h: string) =>
								h.includes("R2") && h.includes("TIME LEFT"),
						);
						const idxR3TimeLeft = headers.findIndex(
							(h: string) =>
								h.includes("R3") && h.includes("TIME LEFT"),
						);

						const safeIndex = (row: string[], idx: number) =>
							idx >= 0 ? Number(row[idx] || 0) : 0;

						const teams = dataRows
							.map((row: any) => {
								const teamName = row[0]?.trim() || "";
								if (!teamName) return null;

								const r1 = safeIndex(row, idxR1);
								const r2 = safeIndex(row, idxR2);
								const r3 = safeIndex(row, idxR3);
								const r1TimeLeft = safeIndex(
									row,
									idxR1TimeLeft,
								);
								const r2TimeLeft = safeIndex(
									row,
									idxR2TimeLeft,
								);
								const r3TimeLeft = safeIndex(
									row,
									idxR3TimeLeft,
								);

								return {
									team: teamName,
									r1,
									r2,
									r3,
									totalScore: r1 + r2 + r3,
									timeLeft:
										r1TimeLeft + r2TimeLeft + r3TimeLeft,
								};
							})
							.filter((t: any) => t !== null);

						const sorted = teams.sort((a: any, b: any) => {
							if (b.totalScore !== a.totalScore) {
								return b.totalScore - a.totalScore;
							}
							// If scores are tied, sort by timeLeft (higher first)
							return b.timeLeft - a.timeLeft;
						});

						resolve(sorted); // return the data here
					})
					.catch((err: any) => reject(err));
			});
		});

		console.log(response);

		return response;
	};

	const query = useQuery({
		queryKey: ["scores", phase?.phase],
		queryFn: fetchData,
		enabled: !!phase,
		refetchInterval: 60000,
		refetchOnWindowFocus: true,
	});

	// useEffect(() => {
	// 	fetchData();
	// }, [currentPhase]);

	const handleShare = async () => {
		if (!selectedMatch) return;
		const shareText = `FIELD REPORT: ${selectedMatch.team1} (${selectedMatch.score1 ?? 0}) vs ${selectedMatch.team2} (${selectedMatch.score2 ?? 0}) at Station ${selectedMatch.station}. Phase Index ${currentPhase < 10 ? `0${currentPhase}` : currentPhase}.`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: "Tournament Field Report",
					text: shareText,
					url: window.location.href,
				});
			} catch (err) {
				console.error("Share failed:", err);
			}
		} else {
			navigator.clipboard.writeText(shareText);
			setShared(true);
			setTimeout(() => setShared(false), 2000);
		}
	};

	const currentBracket = BRACKETS[currentPhase];
	const activeMatches =
		category === "junior" ? currentBracket.junior : currentBracket.senior;

	const nextPhase = () => setCurrentPhase((p) => (p + 1) % BRACKETS.length);
	const prevPhase = () =>
		setCurrentPhase((p) => (p - 1 + BRACKETS.length) % BRACKETS.length);

	return (
		<div className="min-h-screen bg-editorial-bg text-editorial-ink font-sans selection:bg-editorial-gold selection:text-white border-[12px] md:border-[24px] border-editorial-ink flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] p-6 overflow-x-hidden relative">
			<AnimatePresence mode="wait">
				{!selectedMatch ? (
					<div className="w-full flex flex-col items-center max-w-sm">
						<CategoryToggle
							category={category}
							onChange={setCategory}
						/>
						{query.data?.length || 0}
						<PhaseNavigation
							currentPhase={currentPhase}
							phaseName={currentBracket.phaseName}
							onPrevPhase={prevPhase}
							onNextPhase={nextPhase}
						/>
						<BracketList
							matches={activeMatches}
							onSelectMatch={setSelectedMatch}
						/>
					</div>
				) : (
					<MatchDetailView
						match={selectedMatch}
						currentPhase={currentPhase}
						shared={shared}
						effects={effects}
						onBack={() => setSelectedMatch(null)}
						onShare={handleShare}
						onCheerLeft={() => triggerEffect("cheer", "left")}
						onBooLeft={() => triggerEffect("boo", "left")}
						onCheerRight={() => triggerEffect("cheer", "right")}
						onBooRight={() => triggerEffect("boo", "right")}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
