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
  SidebarGroup,
  SidebarGroupLabel,
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

            <SidebarGroup>
                <SidebarGroupLabel>Games</SidebarGroupLabel>
                <SidebarMenuItem>
                    <Link href="/valorant/team-vs-team" className="flex items-center gap-2">
                        <ValorantIcon className="w-4 h-4" />
                        <span>Valorant</span>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/csgo/team-vs-team" className="flex items-center gap-2">
                        <CsgoIcon className="w-4 h-4" />
                        <span>CS:GO</span>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/pubg/player-placement" className="flex items-center gap-2">
                        <PubgIcon className="w-4 h-4" />
                        <span>PUBG</span>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/league-of-legends/match-prediction" className="flex items-center gap-2">
                        <LolIcon className="w-4 h-4" />
                        <span>League of Legends</span>
                    </Link>
                </SidebarMenuItem>
            </SidebarGroup>
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
