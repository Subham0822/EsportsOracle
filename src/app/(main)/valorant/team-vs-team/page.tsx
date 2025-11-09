"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { valorantTeamVsTeamAction } from "@/app/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { SubmitButton } from "@/app/components/submit-button";
import { TeamNameGenerator } from "@/app/components/team-name-generator";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PolarGrid,
  PolarAngleAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const initialState = { winner: null, error: null };

const chartConfig = {
  rating: { label: "Rating" },
  acs: { label: "ACS" },
  kast: { label: "KAST" },
  adr: { label: "ADR" },
  hs: { label: "HS%" },
  fkmd: { label: "FK-FD" },
  team1: { label: "Team 1", color: "hsl(var(--chart-1))" },
  team2: { label: "Team 2", color: "hsl(var(--chart-2))" },
};

function PredictionResult({
  state,
  formData,
}: {
  state: typeof initialState;
  formData: FormData | null;
}) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (state.error) {
    return <p className="text-destructive">{state.error}</p>;
  }

  if (state.winner && formData) {
    const team1Name = formData.get("team1.name") || "Team 1";
    const team2Name = formData.get("team2.name") || "Team 2";
    const winnerName = state.winner === "teamA" ? team1Name : team2Name;

    const chartData = [
      {
        stat: "rating",
        team1: Number(formData.get("team1.rating")),
        team2: Number(formData.get("team2.rating")),
      },
      {
        stat: "acs",
        team1: Number(formData.get("team1.acs")),
        team2: Number(formData.get("team2.acs")),
      },
      {
        stat: "kast",
        team1: Number(formData.get("team1.kast")),
        team2: Number(formData.get("team2.kast")),
      },
      {
        stat: "adr",
        team1: Number(formData.get("team1.adr")),
        team2: Number(formData.get("team2.adr")),
      },
      {
        stat: "hs",
        team1: Number(formData.get("team1.hs")),
        team2: Number(formData.get("team2.hs")),
      },
      {
        stat: "fkmd",
        team1: Number(formData.get("team1.fkmd")),
        team2: Number(formData.get("team2.fkmd")),
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">
          Predicted Winner:{" "}
          <span className="text-primary">{winnerName} 🏆</span>
        </h3>
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[400px]"
        >
          <ResponsiveContainer>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="stat"
                tick={({ payload, x, y, textAnchor }) => (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill="hsl(var(--foreground))"
                    fontSize={12}
                  >
                    {
                      chartConfig[payload.value as keyof typeof chartConfig]
                        .label
                    }
                  </text>
                )}
              />
              <Radar
                name={team1Name.toString()}
                dataKey="team1"
                stroke="var(--color-team1)"
                fill="var(--color-team1)"
                fillOpacity={0.6}
              />
              <Radar
                name={team2Name.toString()}
                dataKey="team2"
                stroke="var(--color-team2)"
                fill="var(--color-team2)"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    );
  }

  return null;
}

const teamFields = [
  {
    name: "rating",
    label: "Average Rating",
    defaultValue: 1.0,
    min: 0,
    max: 3,
    step: 0.01,
  },
  {
    name: "acs",
    label: "Avg Combat Score (ACS)",
    defaultValue: 200,
    min: 0,
    max: 400,
    step: 5,
  },
  {
    name: "k",
    label: "Total Kills",
    defaultValue: 80,
    min: 0,
    max: 200,
    step: 1,
  },
  {
    name: "d",
    label: "Total Deaths",
    defaultValue: 75,
    min: 0,
    max: 200,
    step: 1,
  },
  {
    name: "a",
    label: "Total Assists",
    defaultValue: 35,
    min: 0,
    max: 200,
    step: 1,
  },
  {
    name: "tkmd",
    label: "Total Kill Minus Deaths",
    defaultValue: 10,
    min: -100,
    max: 200,
    step: 1,
  },
  {
    name: "kast",
    label: "Average KAST (%)",
    defaultValue: 0.75,
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    name: "adr",
    label: "Avg Damage/Round (ADR)",
    defaultValue: 150,
    min: 0,
    max: 300,
    step: 1,
  },
  {
    name: "hs",
    label: "Headshot Rate (%)",
    defaultValue: 0.25,
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    name: "fk",
    label: "Total First Kills",
    defaultValue: 5,
    min: 0,
    max: 50,
    step: 1,
  },
  {
    name: "fd",
    label: "Total First Deaths",
    defaultValue: 5,
    min: 0,
    max: 50,
    step: 1,
  },
  {
    name: "fkmd",
    label: "Total First Kill - Deaths",
    defaultValue: 0,
    min: -20,
    max: 20,
    step: 1,
  },
];

export default function ValorantTeamVsTeamPage() {
  const [state, formAction] = useActionState(
    valorantTeamVsTeamAction,
    initialState
  );
  const [formData, setFormData] = useState<FormData | null>(null);

  // Initialize state for both teams
  const [team1Values, setTeam1Values] = useState<Record<string, number>>(
    Object.fromEntries(teamFields.map((f) => [f.name, f.defaultValue]))
  );
  const [team2Values, setTeam2Values] = useState<Record<string, number>>(
    Object.fromEntries(teamFields.map((f) => [f.name, f.defaultValue]))
  );

  const handleAction = (payload: FormData) => {
    setFormData(payload);
    formAction(payload);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-2">Valorant Team vs Team</h1>
        <p className="text-muted-foreground mb-6">
          Compare two teams to predict the match winner.
        </p>

        <form action={handleAction}>
          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Team 1</h3>
                <div className="space-y-2">
                  <Label htmlFor="team1.name">Team Name</Label>
                  <Input
                    id="team1.name"
                    name="team1.name"
                    placeholder="e.g., Sentinels"
                    defaultValue="Team 1"
                  />
                </div>
                {teamFields.map((field) => (
                  <div className="space-y-2" key={`team1-${field.name}`}>
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`team1.${field.name}`}>
                        {field.label}
                      </Label>
                      <span className="text-sm font-medium text-primary">
                        {team1Values[field.name].toFixed(
                          field.step < 1 ? 2 : 0
                        )}
                      </span>
                    </div>
                    <Slider
                      id={`team1.${field.name}`}
                      name={`team1.${field.name}`}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={[team1Values[field.name]]}
                      onValueChange={(value) =>
                        setTeam1Values((prev) => ({
                          ...prev,
                          [field.name]: value[0],
                        }))
                      }
                      className="w-full"
                    />
                    <input
                      type="hidden"
                      name={`team1.${field.name}`}
                      value={team1Values[field.name]}
                    />
                  </div>
                ))}
              </div>

              {/* Team 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Team 2</h3>
                <div className="space-y-2">
                  <Label htmlFor="team2.name">Team Name</Label>
                  <Input
                    id="team2.name"
                    name="team2.name"
                    placeholder="e.g., Fnatic"
                    defaultValue="Team 2"
                  />
                </div>
                {teamFields.map((field) => (
                  <div className="space-y-2" key={`team2-${field.name}`}>
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`team2.${field.name}`}>
                        {field.label}
                      </Label>
                      <span className="text-sm font-medium text-primary">
                        {team2Values[field.name].toFixed(
                          field.step < 1 ? 2 : 0
                        )}
                      </span>
                    </div>
                    <Slider
                      id={`team2.${field.name}`}
                      name={`team2.${field.name}`}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={[team2Values[field.name]]}
                      onValueChange={(value) =>
                        setTeam2Values((prev) => ({
                          ...prev,
                          [field.name]: value[0],
                        }))
                      }
                      className="w-full"
                    />
                    <input
                      type="hidden"
                      name={`team2.${field.name}`}
                      value={team2Values[field.name]}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-6">
              <SubmitButton>Predict Winner ⚔️</SubmitButton>
              <div className="w-full mt-4">
                <PredictionResult state={state} formData={formData} />
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>

      <div className="space-y-8">
        <TeamNameGenerator />
      </div>
    </div>
  );
}
