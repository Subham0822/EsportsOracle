import { z } from 'zod';

export const TeamStatsSchema = z.object({
    kdr: z.coerce.number().min(0, "K/D Ratio must be positive"),
    winRate: z.coerce.number().min(0).max(100),
    acs: z.coerce.number().min(0),
    adr: z.coerce.number().min(0, "ADR must be positive"),
    hsRate: z.coerce.number().min(0).max(100),
});

export const ValorantTeamVsTeamSchema = z.object({
    teamA: TeamStatsSchema,
    teamB: TeamStatsSchema,
});

export const CsgoTeamVsTeamSchema = z.object({
    teamA: TeamStatsSchema,
    teamB: TeamStatsSchema,
});


export const PubgPlayerPlacementSchema = z.object({
    kills: z.coerce.number().min(0, "Kills must be a positive number"),
    damage: z.coerce.number().min(0, "Damage must be a positive number"),
    survivalTime: z.coerce.number().min(0, "Survival time must be a positive number in seconds"),
    revives: z.coerce.number().min(0, "Revives must be a positive number"),
});

export const LolMatchPredictionSchema = z.object({
    team1Dragons: z.coerce.number().min(0).max(4),
    team2Dragons: z.coerce.number().min(0).max(4),
    team1Barons: z.coerce.number().min(0),
    team2Barons: z.coerce.number().min(0),
    team1Turrets: z.coerce.number().min(0).max(11),
    team2Turrets: z.coerce.number().min(0).max(11),
});

export const TeamNameGeneratorSchema = z.object({
    styleDescription: z.string().min(3, "Style description must be at least 3 characters long."),
});
