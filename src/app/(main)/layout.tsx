import Link from "next/link";
import { BrainCircuit, Swords, Gamepad2, Shield } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ValorantIcon, CsgoIcon, PubgIcon, LolIcon } from "@/app/components/icons";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-primary w-8 h-8" />
            <h1 className="text-xl font-semibold">Esports Oracle</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" className="flex items-center gap-2">
                <Gamepad2 size={18} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Valorant</p>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/valorant/single-team" className="flex items-center gap-2">
                    <ValorantIcon className="w-4 h-4" />
                    <span>Single Team Prediction</span>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/valorant/team-vs-team" className="flex items-center gap-2">
                    <ValorantIcon className="w-4 h-4" />
                    <span>Team vs Team</span>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">CS:GO</p>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/csgo/team-vs-team" className="flex items-center gap-2">
                    <CsgoIcon className="w-4 h-4" />
                    <span>Team vs Team</span>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">PUBG</p>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/pubg/player-placement" className="flex items-center gap-2">
                    <PubgIcon className="w-4 h-4" />
                    <span>Player Placement</span>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">League of Legends</p>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/league-of-legends/match-prediction" className="flex items-center gap-2">
                    <LolIcon className="w-4 h-4" />
                    <span>Match Prediction</span>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            {/* Can add user profile or settings here later */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
           <SidebarTrigger />
            {/* Can add breadcrumbs or page title here */}
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
