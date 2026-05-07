import { ArrowLeft } from "lucide-react";

interface MatchDetailHeaderProps {
	onBack: () => void;
}

export function MatchDetailHeader({ onBack }: MatchDetailHeaderProps) {
	return (
		<header className="w-full mb-8">
			<button
				onClick={onBack}
				className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-editorial-gold transition-colors mb-4"
			>
				<ArrowLeft size={16} strokeWidth={4} /> Back to Ledger
			</button>
		</header>
	);
}
