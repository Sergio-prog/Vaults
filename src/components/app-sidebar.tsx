import { Plus, Inbox } from "lucide-react"
import { useParams } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VaultCard } from "./vault-card"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Chat",
    url: "chat",
    icon: Inbox,
  },
]

export function AppSidebar() {
  const { agentId } = useParams()

  return (
    <Sidebar className="w shrink-0 border-r bg-background">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Vaults <span className="text-sm bg-muted px-2 py-0.5 rounded-full">2</span>
            </h2>
            <Button variant="outline" size="icon" className="rounded-lg border-2 h-8 w-8 p-1.5">
              <Plus className="h-full w-full stroke-[2.5px]" />
            </Button>
          </div>
          <Input placeholder="Search" className="mb-4" />

          <SidebarGroup className="mb-4 -mx-4">
            <SidebarGroupLabel className="px-4">Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="pl-4">
                      <a href={`/${agentId}/${item.url}`}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <p className="text-sm text-muted-foreground mb-4">Check out your current vaults</p>

          <VaultCard />
          <VaultCard />
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
