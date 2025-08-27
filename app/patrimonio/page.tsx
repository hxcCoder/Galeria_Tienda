"use client"

import { useLanguage } from "@/contexts/language-context"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeritageHero } from "@/components/heritage/heritage-hero"
import { HeritageContent } from "@/components/heritage/heritage-content"

export default function PatrimonioPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-8">
        <HeritageHero />
        <HeritageContent />
      </div>
      <Footer />
    </main>
  )
}
