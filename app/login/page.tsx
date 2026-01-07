"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Heart } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

export default function LoginPage() {
  const githubMutation = useMutation({
    mutationFn: () => signIn.social({
      provider: "github"
    })
  })

  const anilistMutation = useMutation({
    mutationFn: () => {
      return signIn.social({
        provider: "anilist",
    })
    }
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => githubMutation.mutate()}
            disabled={githubMutation.isPending}
          >
            <Github className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={() => anilistMutation.mutate()}
            disabled={anilistMutation.isPending}
          >
            <Heart className="mr-2 h-4 w-4" />
            Sign in with Anilist
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
