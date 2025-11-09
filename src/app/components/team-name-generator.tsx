'use client';
import { useActionState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/components/submit-button";
import { generateTeamNameAction } from '@/app/lib/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = { teamName: null, error: null };

export function TeamNameGenerator() {
  const [state, formAction] = useActionState(generateTeamNameAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Name Generator</CardTitle>
        <CardDescription>Get creative team names based on a style description.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="styleDescription">Style Description</Label>
            <Input
              id="styleDescription"
              name="styleDescription"
              placeholder="e.g., 'Aggressive and fiery'"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton>Generate Name</SubmitButton>
          {state.teamName && (
            <div className="p-4 bg-muted rounded-md w-full">
              <p className="font-semibold text-lg text-center">"{state.teamName}"</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
