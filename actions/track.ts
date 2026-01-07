'use server';

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { gql, request } from 'graphql-request'

async function getAnilistIdsFromAvailableMangas() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [119257];
}

export const getUserMangaList = async () => {
   const session = await auth.api.getSession({
      headers: await headers()
   });

   if (!session) {
      throw new Error("Unauthorized");
   }

   const account = await db.query.account.findFirst({
      where: (account, { eq }) => eq(account.userId, session.user.id),
   })

   console.log(account?.accountId);

   const document = gql`
  query ($type: MediaType!, $userId: Int!) {
  MediaListCollection(type: $type, userId: $userId) {
    lists {
      name
      entries {
        id
        media {
          id
          title {
            romaji
          }
          coverImage {
            color
            large
          }
          averageScore
          bannerImage
          chapters
        }
        progress
      }
    }
  }
}
`

const data = await request<{
    MediaListCollection: {
        lists: {
            name: string;
            entries: {
                id: number;
                media: {
                    id: number;
                    title: {
                        romaji: string;
                    };
                    coverImage?: {
                        color?: string;
                        large?: string;
                    };
                    averageScore?: number;
                    bannerImage?: string;
                    chapters?: number;
                };
                progress: number;
            }[];
        }[];
    };
}>('https://graphql.anilist.co', document, {
   type: "MANGA",
   userId: Number(account?.accountId)
});

const availableIds = await getAnilistIdsFromAvailableMangas();

const filteredLists = data.MediaListCollection.lists.map((list) => {
   return {
      ...list,
      entries: list.entries.filter((entry) => availableIds.includes(entry.media.id))
   }
})

return data.MediaListCollection.lists;
}
