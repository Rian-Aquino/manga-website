import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
       
    },
    plugins: [
        genericOAuth({
            config: [{
                providerId: "anilist",
                clientId: process.env.ANILIST_CLIENT_ID as string,
                clientSecret: process.env.ANILIST_CLIENT_SECRET as string,
                authorizationUrl: `https://anilist.co/api/v2/oauth/authorize`,
                tokenUrl: "https://anilist.co/api/v2/oauth/token",
                responseType: "token",
                getUserInfo: async (token) => {
                    const response = await fetch("https://graphql.anilist.co", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                        body: JSON.stringify({
                            query: "query { Viewer { id name avatar { large } } }",
                        }),
                    });
                    const { data } = await response.json();

                    console.log(data);
                    
                    return {
                        id: data.Viewer.id.toString(),
                        name: data.Viewer.name,
                        image: data.Viewer.avatar.large,
                        emailVerified: true,
                        email: `${data.Viewer.id}@anilist.co`,
                    };
                },
            }]
        }) 
      ]
});