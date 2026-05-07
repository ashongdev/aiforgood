export type Category = 'JUNIOR' | 'SENIOR';
export type Role = 'ADMIN' | 'JUDGE' | 'PARTICIPANT';

export interface UserProfile {
  uid: string;
  email: string;
  role: Role;
  displayName: string;
  teamId?: string;
}

export interface TeamMember {
  name: string;
  age: number;
}

export interface Team {
  id: string;
  name: string;
  category: Category;
  institution: string;
  ownerId: string;
  members: TeamMember[];
}

export interface Mission1Score {
  correctSeeds: number;
  seedsInCells: number; // Senior only
  misplacedSeeds: number;
  wateredSeededPlots: number;
  wateredUnseededPlots: number;
}

export interface Mission2Score {
  redBlackOffMarker: number;
  redInFruits: number;
  redInWaste: number;
  blackInWaste: number;
  blackInFruits: number;
  greenOffCircle: number;
}

export interface Penalties {
  unauthorizedInteraction: number;
  manipulatingField: number;
  handingSeedsOutside: number;
  robotExitsField: number;
  damageRefDecision: number;
  disqualified: boolean;
}

export interface LiveMatchup {
  id: string;
  teamId: string;
  teamName: string;
  tableNumber: string;
  matchNumber: string;
  startTime: any;
  status: 'PREPARING' | 'LIVE' | 'REVIEW';
}

export interface MatchRound {
  id: string;
  teamId: string;
  teamName?: string;
  judgeId: string;
  judgeName?: string;
  matchNumber: string;
  tableNumber: string;
  roundNumber: number;
  category: Category;
  activePlots: ('ORANGE' | 'GRAY' | 'GREEN')[];
  mission1: Mission1Score;
  mission2: Mission2Score;
  penalties: Penalties;
  totalScore: number;
  status: 'DRAFT' | 'FINAL';
  createdAt: any;
  updatedAt: any;
}
