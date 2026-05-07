import { MatchRound, Category } from '../types';

export function calculateTotalScore(round: Partial<MatchRound>): number {
  if (!round.category) return 0;

  let score = 0;
  const isSenior = round.category === 'SENIOR';
  const m1 = round.mission1;
  const m2 = round.mission2;
  const p = round.penalties;

  if (m1) {
    if (isSenior) {
      score += (m1.correctSeeds || 0) * 5;
      score += (m1.seedsInCells || 0) * 10;
      score += (m1.misplacedSeeds || 0) * -5;
      score += (m1.wateredSeededPlots || 0) * 30;
      score += (m1.wateredUnseededPlots || 0) * -10;
    } else {
      // JUNIOR
      score += (m1.correctSeeds || 0) * 10;
      score += (m1.wateredSeededPlots || 0) * 30;
      // No penalties for misplaced or unseeded watering in junior sheet
    }
  }

  if (m2) {
    if (isSenior) {
      score += (m2.redBlackOffMarker || 0) * 5;
      score += (m2.redInFruits || 0) * 5;
      score += (m2.redInWaste || 0) * -5;
      score += (m2.blackInFruits || 0) * -10;
      score += (m2.blackInWaste || 0) * 10;
      score += (m2.greenOffCircle || 0) * -5;
    } else {
      // JUNIOR
      score += (m2.redBlackOffMarker || 0) * 5;
      score += (m2.redInFruits || 0) * 5;
      score += (m2.blackInWaste || 0) * 10;
      // Senior only penalties ignored for junior
    }
  }

  if (p) {
    score += (p.unauthorizedInteraction || 0) * -20;
    score += (p.manipulatingField || 0) * -20;
    score += (p.handingSeedsOutside || 0) * -20;
    score += (p.robotExitsField || 0) * -20;
    score += (p.damageRefDecision || 0); // This is already a negative number from judge input
    
    if (p.disqualified) {
      return 0; // Disqualification means 0 total score
    }
  }

  return score;
}
