import { NextResponse } from "next/server"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  artist: string
  category: string
  available: boolean
}

function parseSheetData(values: any[][]): any[] {
  if (!values || values.length < 2) return []

  const headers = values[0]
  return values.slice(1).map((row, index) => {
    const item: any = { id: index + 1 }
    headers.forEach((header, colIndex) => {
      const value = row[colIndex] || ""

      if (header === "price") {
        item[header] = Number.parseInt(value) || 0
      } else if (header === "available") {
        item[header] = value.toLowerCase() === "true" || value === "1"
      } else {
        item[header] = value
      }
    })
    return item
  })
}

export async function GET() {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const apiKey = process.env.GOOGLE_API_KEY

    if (!spreadsheetId || !apiKey) {
      // Return fallback products if Google Sheets not configured
      const fallbackProducts: Product[] = [
        {
          id: 1,
          name: "Paisaje Patagónico",
          price: 150000,
          image: "/patagonian-landscape-oil-painting.png",
          description: "Óleo sobre lienzo que captura la majestuosidad de la Patagonia chilena",
          artist: "María González",
          category: "Pintura",
          available: true,
        },
        {
          id: 2,
          name: "Tejuelas Tradicionales",
          price: 85000,
          image: "/traditional-wooden-shingles-architecture-photograp.png",
          description: "Fotografía artística de la arquitectura tradicional de Puerto Montt",
          artist: "Carlos Mendoza",
          category: "Fotografía",
          available: true,
        },
      ]
      return NextResponse.json(fallbackProducts)
    }

    const range = "Productos!A:H"
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const products = parseSheetData(data.values) as Product[]

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return fallback products on error
    const fallbackProducts: Product[] = [
      {
        id: 1,
        name: "Paisaje Patagónico",
        price: 150000,
        image: "/patagonian-landscape-oil-painting.png",
        description: "Óleo sobre lienzo que captura la majestuosidad de la Patagonia chilena",
        artist: "María González",
        category: "Pintura",
        available: true,
      },
    ]
    return NextResponse.json(fallbackProducts)
  }
}
