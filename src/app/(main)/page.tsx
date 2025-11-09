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
    <div className="space-y-12">
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={1600}
                height={600}
                className="w-full h-[400px] object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Esports Oracle
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
                Leverage the power of AI to get predictions and insights for your favorite esports titles.
            </p>
            <Button asChild className="mt-8" size="lg">
                <Link href="/valorant/team-vs-team">Get Started <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Prediction Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.title}>
              <Card className="h-full group hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {tool.icon}
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
                 <CardContent>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    <span>Use Tool</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
