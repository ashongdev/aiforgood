export interface Match {
	id: string;
	team1: string;
	team2: string;
	team1Score: number | null;
	team2Score: number | null;
	team1R1: number | null;
	team1R2: number | null;
	team2R1: number | null;
	team2R2: number | null;
	winner: number | null;
	station: string;
	isBye?: boolean;
}

/**
 * Parse raw sheet data into matches
 */
export function transformSheetDataToMatches(
	sheetData: string[][],
	phaseId: string,
	baseStation: string = "A",
): Match[] {
	return sheetData
		.map((row, index) => {
			if (!row || row.length < 9) return null;

			const team1 = row[0]?.trim();
			const team1R1 = parseInt(row[1] || "0", 10) || 0;
			const team1R2 = parseInt(row[2] || "0", 10) || 0;

			const tableNumber = row[3]?.trim() || "";

			const team2 = row[4]?.trim();
			const team2R1 = parseInt(row[5] || "0", 10) || 0;
			const team2R2 = parseInt(row[6] || "0", 10) || 0;

			const winningTeam = row[8]?.trim();

			// Skip empty rows
			if (!team1) return null;

			const team1Score = team1R1 + team1R2;
			const team2Score = team2R1 + team2R2;

			// Handle bye scenario (only team1, no team2)
			if (!team2) {
				return {
					id: `${phaseId}-${index}`,
					team1,
					team2: "",
					team1Score: null,
					team2Score: null,
					team1R1: null,
					team1R2: null,
					team2R1: null,
					team2R2: null,
					winner: 0, // Team 1 automatically wins a bye
					station:
						tableNumber ||
						`${baseStation}-${String(index + 1).padStart(2, "0")}`,
					isBye: true,
				} as Match;
			}

			let winner: number | null = null;
			if (winningTeam === team1) {
				winner = 0;
			} else if (winningTeam === team2) {
				winner = 1;
			}

			return {
				id: `${phaseId}-${index}`,
				team1,
				team2,
				team1Score,
				team2Score,
				team1R1,
				team1R2,
				team2R1,
				team2R2,
				winner,
				station: tableNumber || `${String(index + 1).padStart(2, "0")}`,
				isBye: false,
			} as Match;
		})
		.filter((match): match is Match => match !== null);
}
