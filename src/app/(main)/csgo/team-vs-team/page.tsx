'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { csgoTeamVsTeamAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SubmitButton } from '@/app/components/submit-button';
import { TeamNameGenerator } from '@/app/components/team-name-generator';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PolarGrid, PolarAngleAxis, Radar, RadarChart, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const initialState = { winner: null, error: null };

const chartConfig = {
  avg_money: { label: "Avg Economy" },
  round_win_rate: { label: "Round Win Rate" },
  ct_rounds: { label: "CT Rounds" },
  t_rounds: { label: "T Rounds" },
  team1: { label: "Team 1", color: "hsl(var(--chart-1))" },
  team2: { label: "Team 2", color: "hsl(var(--chart-2))" },
};

function PredictionResult({ state, formData }: { state: typeof initialState, formData: FormData | null }) {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (state.error) {
        return <p className="text-destructive">{state.error}</p>;
    }
    
    if (state.winner && formData) {
        const team1Name = formData.get('team1.name') || 'Team 1';
        const team2Name = formData.get('team2.name') || 'Team 2';
        const winnerName = state.winner === 'teamA' ? team1Name : team2Name;
        
        const chartData = [
            { stat: 'avg_money', team1: Number(formData.get('team1.avg_money')), team2: Number(formData.get('team2.avg_money')) },
            { stat: 'round_win_rate', team1: Number(formData.get('team1.round_win_rate')), team2: Number(formData.get('team2.round_win_rate')) },
            { stat: 'ct_rounds', team1: Number(formData.get('team1.ct_rounds')), team2: Number(formData.get('team2.ct_rounds')) },
            { stat: 't_rounds', team1: Number(formData.get('team1.t_rounds')), team2: Number(formData.get('team2.t_rounds')) },
        ];
        
        return (
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center">Predicted Winner: <span className="text-primary">{winnerName} 🏆</span></h3>
                 <ChartContainer config={chartConfig} className="w-full aspect-square max-h-[400px]">
                    <ResponsiveContainer>
                        <RadarChart data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" tick={({ payload, x, y, textAnchor }) => (<text x={x} y={y} textAnchor={textAnchor} fill="hsl(var(--foreground))" fontSize={12}>{chartConfig[payload.value as keyof typeof chartConfig].label}</text>)} />
                        <Radar name={team1Name.toString()} dataKey="team1" stroke="var(--color-team1)" fill="var(--color-team1)" fillOpacity={0.6} />
                        <Radar name={team2Name.toString()} dataKey="team2" stroke="var(--color-team2)" fill="var(--color-team2)" fillOpacity={0.6} />
                        <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        );
    }
    
    return null;
}

export default function CsgoTeamVsTeamPage() {
  const [state, formAction] = useActionState(csgoTeamVsTeamAction, initialState);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleAction = (payload: FormData) => {
    setFormData(payload);
    formAction(payload);
  }
  
  const teamFields = [
      { name: "rank", label: "Rank (lower = better)", defaultValue: 50, min: 1, max: 200, step: 1 },
      { name: "avg_money", label: "Average Economy", defaultValue: 7500, min: 0, max: 20000, step: 100 },
      { name: "round_win_rate", label: "Round Win Rate (0-1)", defaultValue: 0.5, min: 0, max: 1, step: 0.01 },
      { name: "ct_rounds", label: "Rounds Won as CT", defaultValue: 8, min: 0, max: 30, step: 1 },
      { name: "t_rounds", label: "Rounds Won as T", defaultValue: 7, min: 0, max: 30, step: 1 },
  ]
  
  // Initialize state for both teams
  const [team1Values, setTeam1Values] = useState<Record<string, number>>(
    Object.fromEntries(teamFields.map(f => [f.name, f.defaultValue]))
  );
  const [team2Values, setTeam2Values] = useState<Record<string, number>>(
    Object.fromEntries(teamFields.map(f => [f.name, f.defaultValue]))
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">CS:GO Team vs Team</h1>
            <p className="text-muted-foreground mb-6">Compare two teams to predict the match winner using key performance stats.</p>

            <form action={handleAction}>
                <Card>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team 1 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Team 1</h3>
                        <div className="space-y-2">
                            <Label htmlFor="team1.name">Team Name</Label>
                            <Input id="team1.name" name="team1.name" placeholder="e.g., Astralis" defaultValue="Team 1" />
                        </div>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`team1-${field.name}`}>
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`team1.${field.name}`}>{field.label}</Label>
                                    <span className="text-sm font-medium text-primary">{team1Values[field.name].toFixed(field.step < 1 ? 2 : 0)}</span>
                                </div>
                                <Slider
                                    id={`team1.${field.name}`}
                                    name={`team1.${field.name}`}
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    value={[team1Values[field.name]]}
                                    onValueChange={(value) => setTeam1Values(prev => ({ ...prev, [field.name]: value[0] }))}
                                    className="w-full"
                                />
                                <input type="hidden" name={`team1.${field.name}`} value={team1Values[field.name]} />
                            </div>
                        ))}
                    </div>

                    {/* Team 2 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Team 2</h3>
                         <div className="space-y-2">
                            <Label htmlFor="team2.name">Team Name</Label>
                            <Input id="team2.name" name="team2.name" placeholder="e.g., Natus Vincere" defaultValue="Team 2" />
                        </div>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`team2-${field.name}`}>
                                <div className="flex justify-between items-center">
                                    <Label htmlFor={`team2.${field.name}`}>{field.label}</Label>
                                    <span className="text-sm font-medium text-primary">{team2Values[field.name].toFixed(field.step < 1 ? 2 : 0)}</span>
                                </div>
                                <Slider
                                    id={`team2.${field.name}`}
                                    name={`team2.${field.name}`}
                                    min={field.min}
                                    max={field.max}
                                    step={field.step}
                                    value={[team2Values[field.name]]}
                                    onValueChange={(value) => setTeam2Values(prev => ({ ...prev, [field.name]: value[0] }))}
                                    className="w-full"
                                />
                                <input type="hidden" name={`team2.${field.name}`} value={team2Values[field.name]} />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-6">
                    <SubmitButton>Predict Winner 💣</SubmitButton>
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
