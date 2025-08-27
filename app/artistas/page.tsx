"use client"

import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ArtistGrid } from "@/components/artists/artist-grid"

export default function ArtistasPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-stone-800 mb-4">{t("artists.title")}</h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("artists.subtitle")}</p>
          </div>
          <ArtistGrid />
        </div>
      </div>
      <Footer />
    </main>
  )
}
