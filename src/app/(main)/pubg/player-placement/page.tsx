'use client';

import { useActionState } from 'react';
import { pubgPlayerPlacementAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-button';
import { useFormStatus } from 'react-dom';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = { placement: null, error: null };

function PredictionResult({ state }: { state: typeof initialState }) {
    const { pending } = useFormStatus();

    if (pending) {
        return <Skeleton className="h-10 w-3/4" />
    }

    if (state.error) {
        return <p className="text-destructive">{state.error}</p>;
    }
    
    if (state.placement !== null) {
        return (
            <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-muted-foreground">Predicted Win Placement</p>
                <p className="text-4xl font-bold text-primary">Top {100 - state.placement.toFixed(0)}%</p>
                <p className="text-sm text-muted-foreground">This player is predicted to place better than {state.placement.toFixed(0)}% of players.</p>
            </div>
        );
    }
    
    return null;
}

export default function PubgPlayerPlacementPage() {
  const [state, formAction] = useActionState(pubgPlayerPlacementAction, initialState);

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">PUBG Player Placement Prediction</h1>
        <p className="text-muted-foreground mb-6">Enter a player's match statistics to predict their placement percentile.</p>

        <form action={formAction}>
            <Card>
            <CardHeader>
                <CardTitle>Player Statistics</CardTitle>
                <CardDescription>Provide the player's performance data from a match.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="kills">Kills</Label>
                    <Input id="kills" name="kills" type="number" placeholder="e.g., 5" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="damage">Damage Dealt</Label>
                    <Input id="damage" name="damage" type="number" placeholder="e.g., 750" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="survivalTime">Survival Time (seconds)</Label>
                    <Input id="survivalTime" name="survivalTime" type="number" placeholder="e.g., 1800" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="revives">Revives</Label>
                    <Input id="revives" name="revives" type="number" placeholder="e.g., 1" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-6">
                <SubmitButton>Predict Placement 🎯</SubmitButton>
                <div className="w-full">
                   <PredictionResult state={state} />
                </div>
            </CardFooter>
            </Card>
      </form>
    </div>
  );
}
