'use client';

import { useActionState } from 'react';
import { pubgPlayerPlacementAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SubmitButton } from '@/app/components/submit-button';
import { useFormStatus } from 'react-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

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
        const placementPercent = (state.placement * 100).toFixed(1);
        let message = '';
        if (state.placement > 0.8) {
            message = "🏆 Great job! You're likely to finish Top 20% or better!";
        } else if (state.placement > 0.5) {
            message = "💪 You're in the Top 50% range — solid performance!";
        } else {
            message = "😬 Below average — try increasing movement or healing!";
        }
        
        return (
            <div className="text-center p-6 bg-muted rounded-lg space-y-2">
                <p className="text-muted-foreground">Predicted Win Placement Percentile</p>
                <p className="text-4xl font-bold text-primary">{state.placement.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">This player is predicted to place better than {placementPercent}% of players.</p>
                <p className="text-sm font-medium mt-2">{message}</p>
            </div>
        );
    }
    
    return null;
}

const playerFields = [
    { name: "walkDistance", label: "Walk Distance (meters)", defaultValue: 2000, min: 0, max: 10000, step: 100 },
    { name: "rideDistance", label: "Ride Distance (meters)", defaultValue: 5000, min: 0, max: 20000, step: 100 },
    { name: "boosts", label: "Boosts Used", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "heals", label: "Heals Used", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "damageDealt", label: "Damage Dealt", defaultValue: 300, min: 0, max: 1500, step: 10 },
    { name: "kills", label: "Kills", defaultValue: 2, min: 0, max: 20, step: 1 },
    { name: "DBNOs", label: "DBNOs (Knocks)", defaultValue: 1, min: 0, max: 10, step: 1 },
    { name: "longestKill", label: "Longest Kill Distance (m)", defaultValue: 50, min: 0, max: 500, step: 5 },
    { name: "killPlace", label: "Kill Placement Rank", defaultValue: 50, min: 1, max: 100, step: 1 },
    { name: "weaponsAcquired", label: "Weapons Acquired", defaultValue: 3, min: 0, max: 20, step: 1 },
];

export default function PubgPlayerPlacementPage() {
  const [state, formAction] = useActionState(pubgPlayerPlacementAction, initialState);
  
  // Initialize state for player stats
  const [playerValues, setPlayerValues] = useState<Record<string, number>>(
    Object.fromEntries(playerFields.map(f => [f.name, f.defaultValue]))
  );

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
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {playerFields.map(field => (
                    <div className="space-y-2" key={field.name}>
                        <div className="flex justify-between items-center">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            <span className="text-sm font-medium text-primary">{playerValues[field.name].toFixed(0)}</span>
                        </div>
                        <Slider
                            id={field.name}
                            name={field.name}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={[playerValues[field.name]]}
                            onValueChange={(value) => setPlayerValues(prev => ({ ...prev, [field.name]: value[0] }))}
                            className="w-full"
                        />
                        <input type="hidden" name={field.name} value={playerValues[field.name]} />
                    </div>
                ))}
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
