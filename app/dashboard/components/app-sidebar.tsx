"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"
import type { User } from "better-auth"
import { useMutation } from "@tanstack/react-query"


interface AppSidebarProps {
  className?: string;
  user: User;
}

export function AppSidebar({ className, user }: AppSidebarProps) {
  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      console.log("User signed out");
      redirect("/")
    }
  });

  return (
    <aside className={cn("w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0", className)}>
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold">Manga App</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="block p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          Home
        </Link>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => mutateAsync()}
              disabled={isPending}
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
      </div>
    </aside>
  )
}
