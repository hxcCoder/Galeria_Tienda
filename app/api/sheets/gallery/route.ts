import { NextResponse } from "next/server"

interface GalleryItem {
  id: number
  title: string
  artist: string
  description: string
  image: string
  year?: string
}

function parseSheetData(values: any[][]): any[] {
  if (!values || values.length < 2) return []

  const headers = values[0]
  return values.slice(1).map((row, index) => {
    const item: any = { id: index + 1 }
    headers.forEach((header, colIndex) => {
      const value = row[colIndex] || ""
      item[header] = value
    })
    return item
  })
}

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const apiKey = process.env.GOOGLE_API_KEY

    if (!spreadsheetId || !apiKey) {
      const fallbackGallery: GalleryItem[] = [
        {
          id: 1,
          title: "Exposición Permanente",
          artist: "Varios Artistas",
          description: "Colección permanente de arte local y regional",
          image: "/modern-cultural-gallery-interior-with-art-displays.png",
          year: "2024",
        },
      ]
      return NextResponse.json(fallbackGallery)
    }

    const range = "Galeria!A:F"
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const gallery = parseSheetData(data.values) as GalleryItem[]

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)

    const fallbackGallery: GalleryItem[] = [
      {
        id: 1,
        title: "Exposición Permanente",
        artist: "Varios Artistas",
        description: "Colección permanente de arte local y regional",
        image: "/modern-cultural-gallery-interior-with-art-displays.png",
        year: "2024",
      },
    ]
    return NextResponse.json(fallbackGallery)
  }
}
