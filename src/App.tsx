import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { BracketList } from "./components/BracketList";
import { CategoryToggle } from "./components/CategoryToggle";
import { MatchDetailView } from "./components/MatchDetailView";
import { PhaseNavigation } from "./components/PhaseNavigation";
import { BRACKETS } from "./data/brackets";
import { useEffects } from "./hooks/useEffects";

export default function App() {
	const [phase, setPhase] = useState(0);
	const [category, setCategory] = useState<"junior" | "senior">("junior");
	const [selectedMatch, setSelectedMatch] = useState<any>(null);
	const [shared, setShared] = useState(false);
	const { effects, triggerEffect } = useEffects();

	const handleShare = async () => {
		if (!selectedMatch) return;
		const shareText = `FIELD REPORT: ${selectedMatch.team1} (${selectedMatch.score1 ?? 0}) vs ${selectedMatch.team2} (${selectedMatch.score2 ?? 0}) at Station ${selectedMatch.station}. Phase Index ${phase < 10 ? `0${phase}` : phase}.`;

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

	const currentBracket = BRACKETS[phase];
	const activeMatches =
		category === "junior" ? currentBracket.junior : currentBracket.senior;

	const nextPhase = () => setPhase((p) => (p + 1) % BRACKETS.length);
	const prevPhase = () =>
		setPhase((p) => (p - 1 + BRACKETS.length) % BRACKETS.length);

	return (
		<div className="min-h-screen bg-editorial-bg text-editorial-ink font-sans selection:bg-editorial-gold selection:text-white border-[12px] md:border-[24px] border-editorial-ink flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] p-6 overflow-x-hidden relative">
			<AnimatePresence mode="wait">
				{!selectedMatch ? (
					<div className="w-full flex flex-col items-center max-w-sm">
						<CategoryToggle
							category={category}
							onChange={setCategory}
						/>
						<PhaseNavigation
							phase={phase}
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
						phase={phase}
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
