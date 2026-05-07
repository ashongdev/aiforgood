import { Heart, ThumbsDown } from "lucide-react";
import { ReactionButton } from "./ReactionButton";

interface Match {
	team1: string;
	team2: string;
}

interface InteractionMatrixProps {
	match: Match;
	onCheerLeft: () => void;
	onBooLeft: () => void;
	onCheerRight: () => void;
	onBooRight: () => void;
}

export function InteractionMatrix({
	match,
	onCheerLeft,
	onBooLeft,
	onCheerRight,
	onBooRight,
}: InteractionMatrixProps) {
	return (
		<div className="w-full space-y-12">
			<div className="grid grid-cols-2 gap-8 pt-6 border-t-2 border-editorial-ink">
				<div className="space-y-6">
					<div className="text-center">
						<span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
							Control / A
						</span>
						<p className="text-[10px] font-serif font-black italic truncate px-2">
							{match.team1}
						</p>
					</div>
					<div className="space-y-3">
						<ReactionButton
							icon={<Heart size={18} />}
							label="Cheer"
							onClick={onCheerLeft}
							disabled={false}
						/>
						<ReactionButton
							icon={<ThumbsDown size={18} />}
							label="Boo"
							onClick={onBooLeft}
							disabled={false}
						/>
					</div>
				</div>

				<div className="space-y-6">
					<div className="text-center">
						<span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">
							Control / B
						</span>
						<p className="text-[10px] font-serif font-black italic truncate px-2">
							{match.team2}
						</p>
					</div>
					<div className="space-y-3">
						<ReactionButton
							icon={<Heart size={18} />}
							label="Cheer"
							onClick={onCheerRight}
							disabled={false}
						/>
						<ReactionButton
							icon={<ThumbsDown size={18} />}
							label="Boo"
							onClick={onBooRight}
							disabled={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
