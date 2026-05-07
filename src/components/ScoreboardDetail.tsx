interface Match {
	id: string;
	team1: string;
	team2: string;
	score1: number | null;
	score2: number | null;
	winner?: number | null;
	station: string;
	stage: string;
}

interface ScoreboardDetailProps {
	match: Match;
}

export function ScoreboardDetail({ match }: ScoreboardDetailProps) {
	return (
		<div className="w-full grid grid-cols-2 border-2 border-editorial-ink bg-white mb-10 relative shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
			<div className="p-8 pb-10 text-center border-r-2 border-editorial-ink relative bg-white">
				<div className="absolute top-3 left-3 text-[8px] font-mono opacity-40 uppercase tracking-widest font-bold">
					Terminal_A
				</div>
				<p className="text-7xl font-mono font-black tracking-tighter text-editorial-ink">
					{match.score1 ?? "--"}
				</p>
				<p className="text-[11px] md:text-[12px] uppercase font-serif font-black italic mt-8 leading-none border-t border-editorial-ink/10 pt-4 px-2">
					{match.team1}
				</p>
			</div>
			<div className="p-8 pb-10 text-center relative bg-slate-50/50">
				<div className="absolute top-3 right-3 text-[8px] font-mono opacity-40 uppercase tracking-widest font-bold">
					Terminal_B
				</div>
				<p className="text-7xl font-mono font-black tracking-tighter text-editorial-ink">
					{match.score2 ?? "--"}
				</p>
				<p className="text-[11px] md:text-[12px] uppercase font-serif font-black italic mt-8 leading-none border-t border-editorial-ink/10 pt-4 px-2">
					{match.team2}
				</p>
			</div>
		</div>
	);
}
