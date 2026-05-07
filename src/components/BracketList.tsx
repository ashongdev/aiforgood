import { motion } from "motion/react";
import { MatchNode } from "./MatchNode";

interface Match {
	id: string;
	team1: string;
	team2: string;
	score1: number | null;
	score2: number | null;
	winner: number | null;
	station: string;
	stage: string;
}

interface BracketListProps {
	matches: Match[];
	onSelectMatch: (match: Match) => void;
}

export function BracketList({ matches, onSelectMatch }: BracketListProps) {
	return (
		<motion.div
			key="list"
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 1.02 }}
			className="w-full flex flex-col items-center max-w-sm"
		>
			<div className="w-full pb-24">
				{matches.map((m, i) => (
					<MatchNode
						key={m.id || i}
						match={m}
						onClick={() => onSelectMatch(m)}
					/>
				))}
			</div>
		</motion.div>
	);
}
