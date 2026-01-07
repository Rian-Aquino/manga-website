import { AppSidebar } from "@/app/dashboard/components/app-sidebar"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
      headers: await headers()
    });
  
    if (!session) {
      redirect("/login");
    }

  return (
    <div className="flex min-h-screen">
        <AppSidebar user={session.user} />
        
        <main className="flex-1">
            {children}
        </main>
    </div>
  )
}
