'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { lolMatchPredictionAction } from '@/app/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-button';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = { winner: null, error: null };

function PredictionResult({ state }: { state: typeof initialState }) {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>
        )
    }

    if (state.error) {
        return <p className="text-destructive">{state.error}</p>;
    }
    
    if (state.winner !== null) {
        const winnerText = state.winner === 1 ? "Team 1 (Blue Side)" : "Team 2 (Red Side)";
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold">Predicted Winner: <span className="text-primary">{winnerText}</span></h3>
                <p className="text-muted-foreground">Based on the objective control stats provided.</p>
            </div>
        );
    }
    
    return null;
}

export default function LolMatchPredictionPage() {
  const [state, formAction] = useFormState(lolMatchPredictionAction, initialState);
  
  const teamFields = [
      { name: "Dragons", id: "Dragons", max: 4, placeholder: "e.g., 2" },
      { name: "Barons", id: "Barons", max: 5, placeholder: "e.g., 1" },
      { name: "Turrets", id: "Turrets", max: 11, placeholder: "e.g., 7" },
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">League of Legends Match Prediction</h1>
        <p className="text-muted-foreground mb-6">Enter objective stats for both teams to predict which one will win.</p>

        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Match Statistics</CardTitle>
                    <CardDescription>Enter the number of major objectives taken by each team.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team 1 */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="text-xl font-semibold text-blue-400">Team 1 (Blue Side)</h3>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`team1-${field.id}`}>
                                <Label htmlFor={`team1${field.id}`}>{field.name}</Label>
                                <Input id={`team1${field.id}`} name={`team1${field.id}`} type="number" min="0" max={field.max} placeholder={field.placeholder} required />
                            </div>
                        ))}
                    </div>

                    {/* Team 2 */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="text-xl font-semibold text-red-400">Team 2 (Red Side)</h3>
                        {teamFields.map(field => (
                             <div className="space-y-2" key={`team2-${field.id}`}>
                                <Label htmlFor={`team2${field.id}`}>{field.name}</Label>
                                <Input id={`team2${field.id}`} name={`team2${field.id}`} type="number" min="0" max={field.max} placeholder={field.placeholder} required />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-6">
                    <SubmitButton>Predict Winner 👑</SubmitButton>
                     <div className="w-full mt-4 h-16 flex items-center justify-center">
                        <PredictionResult state={state} />
                    </div>
                </CardFooter>
            </Card>
        </form>
    </div>
  );
}
