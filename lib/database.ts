import type { Artist, Product, GalleryItem, ContactForm } from "./types"

// Database interface - implement with your preferred database
export interface DatabaseAdapter {
  // Artists
  getArtists(): Promise<Artist[]>
  getArtistBySlug(slug: string): Promise<Artist | null>
  createArtist(artist: Omit<Artist, "id">): Promise<Artist>
  updateArtist(id: string, artist: Partial<Artist>): Promise<Artist>
  deleteArtist(id: string): Promise<void>

  // Products
  getProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product | null>
  getProductsByCategory(category: string): Promise<Product[]>
  createProduct(product: Omit<Product, "id">): Promise<Product>
  updateProduct(id: string, product: Partial<Product>): Promise<Product>
  deleteProduct(id: string): Promise<void>

  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>
  getFeaturedGalleryItems(): Promise<GalleryItem[]>
  createGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem>
  updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem>
  deleteGalleryItem(id: string): Promise<void>

  // Contact
  saveContactForm(form: ContactForm): Promise<void>
}

// JSON file adapter (current implementation)
export class JsonDatabaseAdapter implements DatabaseAdapter {
  private data: any

  constructor() {
    // Load data from JSON files
    this.loadData()
  }

  private async loadData() {
    try {
      const { default: content } = await import("@/data/content.json")
      this.data = content
    } catch (error) {
      console.error("Error loading JSON data:", error)
      this.data = { artists: [], products: [], gallery: [] }
    }
  }

  async getArtists(): Promise<Artist[]> {
    return this.data.artists || []
  }

  async getArtistBySlug(slug: string): Promise<Artist | null> {
    const artists = await this.getArtists()
    return artists.find((artist) => artist.slug === slug) || null
  }

  async createArtist(artist: Omit<Artist, "id">): Promise<Artist> {
    const newArtist = { ...artist, id: Date.now().toString() }
    this.data.artists = [...(this.data.artists || []), newArtist]
    return newArtist
  }

  async updateArtist(id: string, artist: Partial<Artist>): Promise<Artist> {
    const index = this.data.artists.findIndex((a: Artist) => a.id === id)
    if (index === -1) throw new Error("Artist not found")
    this.data.artists[index] = { ...this.data.artists[index], ...artist }
    return this.data.artists[index]
  }

  async deleteArtist(id: string): Promise<void> {
    this.data.artists = this.data.artists.filter((a: Artist) => a.id !== id)
  }

  async getProducts(): Promise<Product[]> {
    return this.data.products || []
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts()
    return products.find((product) => product.id === id) || null
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.getProducts()
    return products.filter((product) => product.category === category)
  }

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    const newProduct = { ...product, id: Date.now().toString() }
    this.data.products = [...(this.data.products || []), newProduct]
    return newProduct
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const index = this.data.products.findIndex((p: Product) => p.id === id)
    if (index === -1) throw new Error("Product not found")
    this.data.products[index] = { ...this.data.products[index], ...product }
    return this.data.products[index]
  }

  async deleteProduct(id: string): Promise<void> {
    this.data.products = this.data.products.filter((p: Product) => p.id !== id)
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return this.data.gallery || []
  }

  async getFeaturedGalleryItems(): Promise<GalleryItem[]> {
    const items = await this.getGalleryItems()
    return items.filter((item) => item.featured)
  }

  async createGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem> {
    const newItem = { ...item, id: Date.now().toString() }
    this.data.gallery = [...(this.data.gallery || []), newItem]
    return newItem
  }

  async updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
    const index = this.data.gallery.findIndex((g: GalleryItem) => g.id === id)
    if (index === -1) throw new Error("Gallery item not found")
    this.data.gallery[index] = { ...this.data.gallery[index], ...item }
    return this.data.gallery[index]
  }

  async deleteGalleryItem(id: string): Promise<void> {
    this.data.gallery = this.data.gallery.filter((g: GalleryItem) => g.id !== id)
  }

  async saveContactForm(form: ContactForm): Promise<void> {
    // In a real implementation, this would save to a database
    console.log("Contact form submitted:", form)
  }
}

// Database instance - easily swappable
export const db = new JsonDatabaseAdapter()
