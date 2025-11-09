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
import { Gamepad2 } from "lucide-react";

const tools = [
  {
    title: "Valorant Team vs Team",
    description: "Predict the winner of a match.",
    href: "/valorant/team-vs-team",
    icon: <ValorantIcon className="w-8 h-8 text-primary" />,
  },
  {
    title: "CS:GO Team vs Team",
    description: "Predict the winner of a match.",
    href: "/csgo/team-vs-team",
    icon: <CsgoIcon className="w-8 h-8 text-primary" />,
  },
  {
    title: "PUBG Player Placement",
    description: "Predict a player's placement.",
    href: "/pubg/player-placement",
    icon: <PubgIcon className="w-8 h-8 text-primary" />,
  },
  {
    title: "LoL Match Prediction",
    description: "Predict match outcome from objectives.",
    href: "/league-of-legends/match-prediction",
    icon: <LolIcon className="w-8 h-8 text-primary" />,
  },
   {
    title: "Team Name Generator",
    description: "Generate creative team names with AI.",
    href: "/valorant/team-vs-team",
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
  },
];

export default function DashboardPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="space-y-8">
      <div className="relative rounded-xl overflow-hidden">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={1200}
                height={400}
                className="w-full h-64 object-cover"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold tracking-tight text-white">Esports Oracle</h1>
            <p className="mt-2 text-lg text-white/80">
                AI-powered predictions for your favorite esports titles.
            </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.title}>
            <Card className="h-full hover:border-primary transition-colors hover:bg-card/50">
              <CardHeader className="flex flex-row items-center gap-4">
                {tool.icon}
                <div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
