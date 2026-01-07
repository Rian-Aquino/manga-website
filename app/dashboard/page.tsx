import { getUserMangaList } from "@/actions/track";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
    const mangaList = await getUserMangaList();

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Manga Library</h1>
                <p className="text-muted-foreground">Browse your manga collection organized by reading status</p>
            </div>

            <div className="space-y-8">
                {mangaList.map((list) => (
                    <div key={list.name} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold">{list.name}</h2>
                            <Badge variant="secondary" className="text-sm">
                                {list.entries.length} {list.entries.length === 1 ? 'manga' : 'mangas'}
                            </Badge>
                        </div>

                        <Separator />

                        {list.entries.length === 0 ? (
                            <Card className="border-dashed">
                                <CardContent className="flex items-center justify-center py-12">
                                    <p className="text-muted-foreground text-sm">No manga in this list yet</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {list.entries.map((entry) => (
                                    <Card key={entry.id} className="overflow-x-hidden hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group pt-0">
                                        {/* Cover Image */}
                                        <div className="relative w-full overflow-hidden bg-gradient-to-b from-muted to-background">
                                            {entry.media.coverImage?.large ? (
                                                <>
                                                    <img 
                                                        src={entry.media.coverImage.large} 
                                                        alt={entry.media.title.romaji}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                    />
                                                    {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" /> */}
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    No Cover
                                                </div>
                                            )}
                                            
                                            {/* Score Badge */}
                                            {entry.media.averageScore && (
                                                <div className="absolute top-3 right-3">
                                                    <Badge 
                                                        className="font-bold shadow-lg"
                                                        style={{
                                                            backgroundColor: entry.media.coverImage?.color || undefined,
                                                            color: entry.media.coverImage?.color ? 'white' : undefined
                                                        }}
                                                    >
                                                        ⭐ {entry.media.averageScore}%
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="space-y-2">
                                            <CardTitle className="line-clamp-2 text-base leading-tight">
                                                {entry.media.title.romaji}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 text-xs">
                                                {entry.progress ? (
                                                    <span className="flex items-center gap-1">
                                                        📚 {entry.progress} chapters read
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">Ongoing</span>
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        
                                        <CardContent>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Badge variant="outline" className="text-xs">
                                                    ID: {entry.media.id}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}