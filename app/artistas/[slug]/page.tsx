"use client"

import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ArtistProfile } from "@/components/artists/artist-profile"
import content from "@/data/content.json"

interface ArtistPageProps {
  params: {
    slug: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const { t } = useLanguage()
  const artist = content.artists.find((a) => a.slug === params.slug)

  if (!artist) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-stone-800 mb-4">{t("artists.notFound")}</h1>
              <p className="text-stone-600">{t("artists.notFoundMessage")}</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <ArtistProfile artist={artist} />
      </div>
      <Footer />
    </main>
  )
}
