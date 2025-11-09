'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { valorantTeamVsTeamAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-button';
import { TeamNameGenerator } from '@/app/components/team-name-generator';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PolarGrid, PolarAngleAxis, Radar, RadarChart, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const initialState = { winner: null, error: null };

const chartConfig = {
  kdr: { label: "K/D Ratio" },
  winRate: { label: "Win Rate" },
  acs: { label: "ACS" },
  adr: { label: "ADR" },
  hsRate: { label: "HS%" },
  teamA: { label: "Team A", color: "hsl(var(--chart-1))" },
  teamB: { label: "Team B", color: "hsl(var(--chart-2))" },
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
        const teamAName = formData.get('teamA.name') || 'Team A';
        const teamBName = formData.get('teamB.name') || 'Team B';
        const winnerName = state.winner === 'teamA' ? teamAName : teamBName;
        
        const chartData = [
            { stat: 'kdr', teamA: Number(formData.get('teamA.kdr')), teamB: Number(formData.get('teamB.kdr')) },
            { stat: 'winRate', teamA: Number(formData.get('teamA.winRate')), teamB: Number(formData.get('teamB.winRate')) },
            { stat: 'acs', teamA: Number(formData.get('teamA.acs')), teamB: Number(formData.get('teamB.acs')) },
            { stat: 'adr', teamA: Number(formData.get('teamA.adr')), teamB: Number(formData.get('teamB.adr')) },
            { stat: 'hsRate', teamA: Number(formData.get('teamA.hsRate')), teamB: Number(formData.get('teamB.hsRate')) },
        ];
        
        return (
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center">Predicted Winner: <span className="text-primary">{winnerName} 🏆</span></h3>
                 <ChartContainer config={chartConfig} className="w-full aspect-square max-h-[400px]">
                    <ResponsiveContainer>
                        <RadarChart data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat" tick={({ payload, x, y, textAnchor }) => (<text x={x} y={y} textAnchor={textAnchor} fill="hsl(var(--foreground))" fontSize={12}>{chartConfig[payload.value as keyof typeof chartConfig].label}</text>)} />
                        <Radar name={teamAName.toString()} dataKey="teamA" stroke="var(--color-teamA)" fill="var(--color-teamA)" fillOpacity={0.6} />
                        <Radar name={teamBName.toString()} dataKey="teamB" stroke="var(--color-teamB)" fill="var(--color-teamB)" fillOpacity={0.6} />
                        <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        );
    }
    
    return null;
}

export default function ValorantTeamVsTeamPage() {
  const [state, formAction] = useActionState(valorantTeamVsTeamAction, initialState);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleAction = (payload: FormData) => {
    setFormData(payload);
    formAction(payload);
  }
  
  const teamFields = [
      { name: "kdr", label: "K/D Ratio", placeholder: "1.1", type: "number", step: "0.01" },
      { name: "winRate", label: "Win Rate (%)", placeholder: "60", type: "number", step: "0.1" },
      { name: "acs", label: "Avg Combat Score", placeholder: "220.5", type: "number", step: "0.1" },
      { name: "adr", label: "Avg Damage/Round", placeholder: "150.2", type: "number", step: "0.1" },
      { name: "hsRate", label: "Headshot %", placeholder: "25.5", type: "number", step: "0.1" },
  ]
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Valorant Team vs Team</h1>
            <p className="text-muted-foreground mb-6">Compare two teams to predict the match winner.</p>

            <form action={handleAction}>
                <Card>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team A */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Team A</h3>
                        <div className="space-y-2">
                            <Label htmlFor="teamA.name">Team Name</Label>
                            <Input id="teamA.name" name="teamA.name" placeholder="e.g., Sentinels" defaultValue="Team A" />
                        </div>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`teamA-${field.name}`}>
                                <Label htmlFor={`teamA.${field.name}`}>{field.label}</Label>
                                <Input id={`teamA.${field.name}`} name={`teamA.${field.name}`} type={field.type} step={field.step} placeholder={field.placeholder} required />
                            </div>
                        ))}
                    </div>

                    {/* Team B */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Team B</h3>
                         <div className="space-y-2">
                            <Label htmlFor="teamB.name">Team Name</Label>
                            <Input id="teamB.name" name="teamB.name" placeholder="e.g., Fnatic" defaultValue="Team B" />
                        </div>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`teamB-${field.name}`}>
                                <Label htmlFor={`teamB.${field.name}`}>{field.label}</Label>
                                <Input id={`teamB.${field.name}`} name={`teamB.${field.name}`} type={field.type} step={field.step} placeholder={field.placeholder} required />
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
