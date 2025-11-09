"use server";

import { generateTeamNames } from "@/ai/flows/generate-team-names";
import { z } from "zod";
import {
  TeamNameGeneratorSchema,
  ValorantTeamVsTeamSchema,
  CsgoTeamVsTeamSchema,
  PubgPlayerPlacementSchema,
  LolMatchPredictionSchema,
} from "./types";

// Backend API URL - adjust if needed
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Team Name Generator Action
export async function generateTeamNameAction(
  prevState: { teamName: string | null; error: string | null },
  formData: FormData
) {
  try {
    const validatedFields = TeamNameGeneratorSchema.safeParse({
      styleDescription: formData.get("styleDescription"),
    });

    if (!validatedFields.success) {
      return {
        teamName: null,
        error:
          validatedFields.error.flatten().fieldErrors.styleDescription?.[0] ||
          "Invalid input.",
      };
    }

    const result = await generateTeamNames(validatedFields.data);
    return { teamName: result.teamName, error: null };
  } catch (error) {
    return {
      teamName: null,
      error: "Failed to generate team name. Please try again.",
    };
  }
}

// Valorant Team vs Team Prediction Action
export async function valorantTeamVsTeamAction(
  prevState: { winner: "teamA" | "teamB" | null; error: string | null },
  formData: FormData
) {
  try {
    const team1 = {
      rating: Number(formData.get("team1.rating")),
      acs: Number(formData.get("team1.acs")),
      k: Number(formData.get("team1.k")),
      d: Number(formData.get("team1.d")),
      a: Number(formData.get("team1.a")),
      tkmd: Number(formData.get("team1.tkmd")),
      kast: Number(formData.get("team1.kast")),
      adr: Number(formData.get("team1.adr")),
      hs: Number(formData.get("team1.hs")),
      fk: Number(formData.get("team1.fk")),
      fd: Number(formData.get("team1.fd")),
      fkmd: Number(formData.get("team1.fkmd")),
    };

    const team2 = {
      rating: Number(formData.get("team2.rating")),
      acs: Number(formData.get("team2.acs")),
      k: Number(formData.get("team2.k")),
      d: Number(formData.get("team2.d")),
      a: Number(formData.get("team2.a")),
      tkmd: Number(formData.get("team2.tkmd")),
      kast: Number(formData.get("team2.kast")),
      adr: Number(formData.get("team2.adr")),
      hs: Number(formData.get("team2.hs")),
      fk: Number(formData.get("team2.fk")),
      fd: Number(formData.get("team2.fd")),
      fkmd: Number(formData.get("team2.fkmd")),
    };

    const response = await fetch(`${API_BASE_URL}/api/valorant/vs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1, team2 }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const winner = data.winner === "team1" ? "teamA" : "teamB";
    return { winner, error: null };
  } catch (error) {
    return { winner: null, error: "Prediction failed. Please try again." };
  }
}

// CS:GO Team vs Team Prediction Action
export async function csgoTeamVsTeamAction(
  prevState: { winner: "teamA" | "teamB" | null; error: string | null },
  formData: FormData
) {
  try {
    const team1 = {
      rank: Number(formData.get("team1.rank")),
      avg_money: Number(formData.get("team1.avg_money")),
      round_win_rate: Number(formData.get("team1.round_win_rate")),
      ct_rounds: Number(formData.get("team1.ct_rounds")),
      t_rounds: Number(formData.get("team1.t_rounds")),
    };

    const team2 = {
      rank: Number(formData.get("team2.rank")),
      avg_money: Number(formData.get("team2.avg_money")),
      round_win_rate: Number(formData.get("team2.round_win_rate")),
      ct_rounds: Number(formData.get("team2.ct_rounds")),
      t_rounds: Number(formData.get("team2.t_rounds")),
    };

    const response = await fetch(`${API_BASE_URL}/api/csgo/vs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1, team2 }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const winner = data.winner === "team1" ? "teamA" : "teamB";
    return { winner, error: null };
  } catch (error) {
    return { winner: null, error: "Prediction failed. Please try again." };
  }
}

// PUBG Player Placement Prediction Action
export async function pubgPlayerPlacementAction(
  prevState: { placement: number | null; error: string | null },
  formData: FormData
) {
  try {
    const requestData = {
      walkDistance: Number(formData.get("walkDistance")),
      boosts: Number(formData.get("boosts")),
      weaponsAcquired: Number(formData.get("weaponsAcquired")),
      damageDealt: Number(formData.get("damageDealt")),
      heals: Number(formData.get("heals")),
      kills: Number(formData.get("kills")),
      rideDistance: Number(formData.get("rideDistance")),
      longestKill: Number(formData.get("longestKill")),
      DBNOs: Number(formData.get("DBNOs")),
      killPlace: Number(formData.get("killPlace")),
    };

    const response = await fetch(`${API_BASE_URL}/api/pubg/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return { placement: data.placement, error: null };
  } catch (error) {
    return { placement: null, error: "Prediction failed. Please try again." };
  }
}

// LoL Match Prediction Action
export async function lolMatchPredictionAction(
  prevState: { winner: 1 | 2 | null; error: string | null },
  formData: FormData
) {
  try {
    const team1 = {
      towerKills: Number(formData.get("team1TowerKills")),
      inhibitorKills: Number(formData.get("team1InhibitorKills")),
      baronKills: Number(formData.get("team1BaronKills")),
      dragonKills: Number(formData.get("team1DragonKills")),
      riftHeraldKills: Number(formData.get("team1RiftHeraldKills")),
    };

    const team2 = {
      towerKills: Number(formData.get("team2TowerKills")),
      inhibitorKills: Number(formData.get("team2InhibitorKills")),
      baronKills: Number(formData.get("team2BaronKills")),
      dragonKills: Number(formData.get("team2DragonKills")),
      riftHeraldKills: Number(formData.get("team2RiftHeraldKills")),
    };

    const response = await fetch(`${API_BASE_URL}/api/lol/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1, team2 }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return { winner: data.winner as 1 | 2, error: null };
  } catch (error) {
    return { winner: null, error: "Prediction failed. Please try again." };
  }
}
