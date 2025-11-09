import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValorantIcon, CsgoIcon, PubgIcon, LolIcon } from "@/app/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Gamepad2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Valorant: Team vs Team",
    description: "Predict the winner of a Valorant match based on team stats.",
    href: "/valorant/team-vs-team",
    icon: <ValorantIcon className="w-6 h-6" />,
  },
  {
    title: "CS:GO: Team vs Team",
    description: "Predict the winner of a CS:GO match using key performance stats.",
    href: "/csgo/team-vs-team",
    icon: <CsgoIcon className="w-6 h-6" />,
  },
  {
    title: "PUBG: Player Placement",
    description: "Predict a player's final placement percentile in a PUBG match.",
    href: "/pubg/player-placement",
    icon: <PubgIcon className="w-6 h-6" />,
  },
  {
    title: "LoL: Match Prediction",
    description: "Predict match outcomes in League of Legends from objective control.",
    href: "/league-of-legends/match-prediction",
    icon: <LolIcon className="w-6 h-6" />,
  },
   {
    title: "AI Team Name Generator",
    description: "Generate creative and unique team names with a spark of AI.",
    href: "/valorant/team-vs-team", // Note: This links to Valorant page as it contains the generator
    icon: <Gamepad2 className="w-6 h-6" />,
  },
];

export default function DashboardPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="space-y-8">
      <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Gamepad2 className="w-8 h-8 text-muted-foreground" />
            <h1 className="text-4xl font-bold tracking-tight">Welcome to Esports Oracle</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Leverage the power of AI to get predictions and insights for your favorite esports titles. Select a tool below to get started.
          </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.title} className="group">
            <Card className="h-full hover:border-primary/60 transition-colors duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                   <div className="p-3 bg-muted rounded-lg">
                      {tool.icon}
                  </div>
                  <div className="flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Use Tool</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
