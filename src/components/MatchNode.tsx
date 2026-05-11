import { motion } from "motion/react";
import ReactGA from "react-ga4";
import { AnimatedScore } from "./AnimatedScore";

interface MatchNodeProps {
	match: {
		id: string;
		team1: string;
		team2: string;
		team1Score: number | null;
		team2Score: number | null;
		winner: number | null;
		station: string;
		isBye?: boolean;
	};
	onClick: () => void;
}

const teamLogos: Record<string, string> = {
	"Nanovolts": "/logos/Senior/Nanovolts.svg",
	"Ai Squad": "/logos/Senior/Ai Squad.svg",
	"Masterminds": "/logos/Senior/Masterminds.svg",
	"Aris Eagles Senior": "/logos/Senior/Aris Eagles Senior.svg",
	"Redeemer Tech": "/logos/Senior/Redeemer Tech.svg",
	"Stemr Seniors": "/logos/Senior/Stemr Seniors.svg",
	"Rookies": "/logos/Senior/Rookies.svg",
	"Createch": "/logos/Senior/Create T.svg",
	"Team Applied": "/logos/Senior/Team Applied.svg",
	"Fusion Innovators": "/logos/Senior/Fusion Innovators.svg",
	"Beta Gold-St": "/logos/Senior/Beta Gold-St.svg",
	"Klone": "/logos/Senior/Klone.svg",
	"Kepler-Robot": "/logos/Senior/Kepler-Robot.svg",
	"Ycem": "/logos/Senior/Ycem.svg",
	"Ahtoo Alpha Gold St": "/logos/Senior/Ahtoo Alpha Gold St.svg",
	"Novex": "/logos/Senior/Novex.svg",
	// "Kepler-Robot": "/logos/Kepler-Robot.svg",
	// "Createch": "/logos/Createch.svg",
	// "Stemr Seniors": "/logos/Stemr-Seniors.svg",
};

export function MatchNode({ match, onClick }: MatchNodeProps) {
	const handleClick = () => {
		ReactGA.event({
			category: "User",
			action: `Matchup Clicked:${match.team1} vs ${match.team2}`,
		});
		onClick();
	};

	return (
		<motion.div
			whileHover={{ x: 4, y: 4 }}
			whileTap={{ scale: 0.98 }}
			onClick={handleClick}
			className="w-full border-2 border-editorial-ink bg-white shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] overflow-hidden cursor-pointer active:shadow-none transition-shadow h-full"
		>
			<div className="flex justify-between items-center px-4 py-2 border-b-2 border-editorial-ink bg-slate-50">
				<span className="text-[10px] font-black uppercase tracking-[0.2em] text-editorial-gold">
					STAGE
				</span>
				<span className="font-mono text-[10px] font-bold py-0.5 px-2 border border-editorial-ink">
					TABLE {match.station}
				</span>
			</div>
			<div className="p-6 space-y-5">
				{/* Team 1 */}
				<div
					className={`flex justify-between items-center ${match.winner === 0 ? "opacity-100" : match.winner === 1 ? "opacity-30" : "opacity-100"}`}
				>
					<span className="flex items-center gap-2 min-w-0">
						{teamLogos[match.team1] && (
							<img
								src={teamLogos[match.team1]}
								alt={match.team1}
								className="w-7 h-7 object-contain shrink-0"
							/>
						)}
						<span className="font-serif text-2xl font-black italic tracking-tight leading-tight truncate">
							{match.team1}
						</span>
					</span>
					<span className="font-mono text-xl font-black shrink-0 ml-2">
						{match.team1Score ? (
							<AnimatedScore value={match.team1Score} />
						) : (
							"--"
						)}
					</span>
				</div>

				{/* VS divider */}
				<div className="flex items-center gap-4 py-2">
					<div className="h-0.5 flex-1 bg-editorial-ink" />
					<span className="text-[11px] font-black italic text-editorial-gold">
						VS
					</span>
					<div className="h-0.5 flex-1 bg-editorial-ink" />
				</div>

				{/* Team 2 */}
				<div
					className={`flex justify-between items-center ${match.winner === 1 ? "opacity-100" : match.winner === 0 ? "opacity-30" : "opacity-100"}`}
				>
					<span className="flex items-center gap-2 min-w-0">
						{teamLogos[match.team2] && (
							<img
								src={teamLogos[match.team2]}
								alt={match.team2}
								className="w-7 h-7 object-contain shrink-0"
							/>
						)}
						<span className="font-serif text-2xl font-black italic tracking-tight leading-tight truncate">
							{match.team2}
						</span>
					</span>
					<span className="font-mono text-xl font-black shrink-0 ml-2">
						{match.team2Score ? (
							<AnimatedScore value={match.team2Score} />
						) : (
							"--"
						)}
					</span>
				</div>
			</div>
		</motion.div>
	);
}