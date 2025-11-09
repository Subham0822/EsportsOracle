'use server';

import { generateTeamNames } from '@/ai/flows/generate-team-names';
import { z } from 'zod';
import { TeamNameGeneratorSchema, ValorantTeamVsTeamSchema, CsgoTeamVsTeamSchema, PubgPlayerPlacementSchema, LolMatchPredictionSchema } from './types';

// Helper function to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Team Name Generator Action
export async function generateTeamNameAction(
  prevState: { teamName: string | null; error: string | null },
  formData: FormData
) {
  try {
    const validatedFields = TeamNameGeneratorSchema.safeParse({
      styleDescription: formData.get('styleDescription'),
    });

    if (!validatedFields.success) {
      return { teamName: null, error: validatedFields.error.flatten().fieldErrors.styleDescription?.[0] || 'Invalid input.' };
    }

    const result = await generateTeamNames(validatedFields.data);
    return { teamName: result.teamName, error: null };
  } catch (error) {
    return { teamName: null, error: 'Failed to generate team name. Please try again.' };
  }
}

// Valorant Team vs Team Prediction Action (Mock)
export async function valorantTeamVsTeamAction(
  prevState: { winner: 'teamA' | 'teamB' | null; error: string | null },
  formData: FormData
) {
    await sleep(1500);
    try {
        const teamA_kdr = formData.get('teamA.kdr');
        const teamB_kdr = formData.get('teamB.kdr');
        // Simple mock logic: higher KDR wins
        const winner = Number(teamA_kdr) > Number(teamB_kdr) ? 'teamA' : 'teamB';
        return { winner, error: null };
    } catch (error) {
        return { winner: null, error: 'Prediction failed. Please try again.' };
    }
}

// CS:GO Team vs Team Prediction Action (Mock)
export async function csgoTeamVsTeamAction(
    prevState: { winner: 'teamA' | 'teamB' | null; error: string | null },
    formData: FormData
  ) {
      await sleep(1500);
      try {
          const teamA_adr = formData.get('teamA.adr');
          const teamB_adr = formData.get('teamB.adr');
          // Simple mock logic: higher ADR wins
          const winner = Number(teamA_adr) > Number(teamB_adr) ? 'teamA' : 'teamB';
          return { winner, error: null };
      } catch (error) {
          return { winner: null, error: 'Prediction failed. Please try again.' };
      }
  }

// PUBG Player Placement Prediction Action (Mock)
export async function pubgPlayerPlacementAction(
  prevState: { placement: number | null; error: string | null },
  formData: FormData
) {
  await sleep(1500);
  try {
    const validatedFields = PubgPlayerPlacementSchema.safeParse({
      kills: formData.get('kills'),
      damage: formData.get('damage'),
      survivalTime: formData.get('survivalTime'),
      revives: formData.get('revives'),
    });

    if (!validatedFields.success) {
      return { placement: null, error: 'Invalid input. Please check your numbers.' };
    }
    
    // Mock logic
    const placement = Math.random() * (99 - 70) + 70;
    return { placement, error: null };
  } catch (error) {
    return { placement: null, error: 'Prediction failed. Please try again.' };
  }
}

// LoL Match Prediction Action (Mock)
export async function lolMatchPredictionAction(
  prevState: { winner: 1 | 2 | null; error: string | null },
  formData: FormData
) {
  await sleep(1500);
  try {
    const validatedFields = LolMatchPredictionSchema.safeParse({
        team1Dragons: formData.get('team1Dragons'),
        team2Dragons: formData.get('team2Dragons'),
        team1Barons: formData.get('team1Barons'),
        team2Barons: formData.get('team2Barons'),
        team1Turrets: formData.get('team1Turrets'),
        team2Turrets: formData.get('team2Turrets'),
    });

    if (!validatedFields.success) {
        return { winner: null, error: 'Invalid input. Please check your numbers.' };
    }

    const { team1Dragons, team2Dragons, team1Barons, team2Barons, team1Turrets, team2Turrets } = validatedFields.data;

    // Mock logic
    let score1 = team1Dragons * 2 + team1Barons * 5 + team1Turrets;
    let score2 = team2Dragons * 2 + team2Barons * 5 + team2Turrets;
    
    const winner = score1 > score2 ? 1 : 2;
    return { winner, error: null };
  } catch (error) {
    return { winner: null, error: 'Prediction failed. Please try again.' };
  }
}
