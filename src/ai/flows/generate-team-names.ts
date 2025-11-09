'use server';

/**
 * @fileOverview Team name generation flow.
 *
 * - generateTeamNames - A function that generates team names based on style description.
 * - GenerateTeamNamesInput - The input type for the generateTeamNames function.
 * - GenerateTeamNamesOutput - The return type for the generateTeamNames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTeamNamesInputSchema = z.object({
  styleDescription: z
    .string()
    .describe('The style or theme for generating team names.'),
});
export type GenerateTeamNamesInput = z.infer<typeof GenerateTeamNamesInputSchema>;

const GenerateTeamNamesOutputSchema = z.object({
  teamName: z.string().describe('The generated team name.'),
});
export type GenerateTeamNamesOutput = z.infer<typeof GenerateTeamNamesOutputSchema>;

export async function generateTeamNames(input: GenerateTeamNamesInput): Promise<GenerateTeamNamesOutput> {
  return generateTeamNamesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTeamNamesPrompt',
  input: {schema: GenerateTeamNamesInputSchema},
  output: {schema: GenerateTeamNamesOutputSchema},
  prompt: `You are a creative team name generator. Based on the style description, generate a unique and fitting team name. Style Description: {{{styleDescription}}}`,
});

const generateTeamNamesFlow = ai.defineFlow(
  {
    name: 'generateTeamNamesFlow',
    inputSchema: GenerateTeamNamesInputSchema,
    outputSchema: GenerateTeamNamesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
