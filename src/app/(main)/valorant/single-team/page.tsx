'use client';

import { useFormState } from 'react-dom';
import { valorantSingleTeamAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-button';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormStatus } from 'react-dom';

const initialState = { winProbability: null, error: null };

function PredictionResult({ state }: { state: typeof initialState }) {
    const { pending } = useFormStatus();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (pending) {
            setProgress(0);
        }
        if (state.winProbability) {
            const timer = setTimeout(() => setProgress(state.winProbability!), 100);
            return () => clearTimeout(timer);
        }
    }, [state.winProbability, pending]);

    if (pending) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
            </div>
        )
    }

    if (state.error) {
        return <p className="text-destructive">{state.error}</p>;
    }
    
    if (state.winProbability !== null) {
        return (
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Predicted Win Probability: <span className="text-primary">{state.winProbability.toFixed(2)}%</span></h3>
                <Progress value={progress} className="w-full" />
            </div>
        );
    }
    
    return null;
}

export default function ValorantSingleTeamPage() {
  const [state, formAction] = useFormState(valorantSingleTeamAction, initialState);

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Valorant Single Team Prediction</h1>
        <p className="text-muted-foreground mb-6">Enter a team's statistics to predict their win probability in the next match.</p>

        <form action={formAction}>
            <Card>
            <CardHeader>
                <CardTitle>Team Statistics</CardTitle>
                <CardDescription>Provide the averages for the team.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="kdr">K/D Ratio</Label>
                    <Input id="kdr" name="kdr" type="number" step="0.01" placeholder="e.g., 1.15" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="winRate">Win Rate (%)</Label>
                    <Input id="winRate" name="winRate" type="number" step="0.1" placeholder="e.g., 55.5" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="acs">Average Combat Score (ACS)</Label>
                    <Input id="acs" name="acs" type="number" step="1" placeholder="e.g., 210.3" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="firstBloods">First Bloods per Round</Label>
                    <Input id="firstBloods" name="firstBloods" type="number" step="0.01" placeholder="e.g., 0.12" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-6">
                <SubmitButton>Predict Win Probability 🚀</SubmitButton>
                <div className="w-full">
                    <PredictionResult state={state} />
                </div>
            </CardFooter>
            </Card>
      </form>
    </div>
  );
}
