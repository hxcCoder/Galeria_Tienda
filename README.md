CASA Tejuela - Galería Cultural & Ecommerce
-
Maqueta de paginaweb eecomerce-galeria, configurable y personalizable hecha con Next.js y con backend adaptable.

🔗 **Demo en Vercel:** [galeria-tienda.vercel.app](https://galeria-tienda.vercel.app)
---

## ✨ Características

- Página de inicio con galería de productos.  
- Sección de proyectos y contacto.  
- Backend básico para manejo de datos.  
- Deploy en Vercel.  

✏️ Cómo Editar Contenido
-

### 1. Cambiar Textos
Los textos están directamente en los componentes. Para editarlos:

\`\`\`tsx
// components/sections/about.tsx
<h2>Tu nuevo título</h2>
<p>Tu nueva descripción</p>
\`\`\`

### 2. Agregar/Cambiar Imágenes
1. Coloca tus imágenes en la carpeta `public/`
2. Actualiza las referencias en los componentes:

\`\`\`tsx
// Ejemplo en hero.tsx
<Image src="/tu-nueva-imagen.jpg" alt="Descripción" />
\`\`\`

### 3. Modificar Colores
Edita las variables CSS en `app/globals.css`:

\`\`\`css
:root {
  --primary: #tu-color-primario;
  --secondary: #tu-color-secundario;
  /* ... más colores */
}
\`\`\`

### 4. Cambiar Logo
1. Reemplaza `public/logo-casa-tejuela.png` con tu logo
2. O actualiza la ruta en `lib/config.ts`:

\`\`\`tsx
export const siteConfig = {
  branding: {
    logo: {
      primary: "/tu-logo.png"
    }
  }
}
\`\`\`

## 🔧 Configuración Avanzada

### Fuentes
El sitio usa Work Sans y Open Sans. Para cambiar:

\`\`\`tsx
// app/layout.tsx
import { Truculenta as Tu_Fuente } from 'next/font/google'

const tuFuente = Tu_Fuente({
  subsets: ["latin"],
  variable: "--font-tu-fuente",
})
\`\`\`

### Secciones
Para agregar/quitar secciones, edita `app/page.tsx`:

\`\`\`tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <TuNuevaSeccion /> */}
        <Gallery />
        {/* Comenta o descomenta secciones */}
        <Cart />
      </main>
      <Footer />
    </>
  )
}
\`\`\`

## 🌐 Conectores y Backends

### Opciones de Backend Recomendadas

#### 1. **Supabase** (Recomendado)
\`\`\`bash
# Instalar
npm install @supabase/supabase-js

# Configurar
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
\`\`\`

#### 2. **Vercel Blob** (Para imágenes)
\`\`\`bash
# Variables de entorno
BLOB_READ_WRITE_TOKEN=tu-token
\`\`\`

#### 3. **Stripe** (Para e-commerce)
\`\`\`bash
# Variables de entorno
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
\`\`\`

#### 4. **Resend** (Para emails)
\`\`\`bash
# Variables de entorno
RESEND_API_KEY=tu-api-key
\`\`\`

### Ejemplo de Integración con Supabase

\`\`\`tsx
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Usar en componentes
const { data, error } = await supabase
  .from('artworks')
  .select('*')
\`\`\`

---

## 🛒 Configuración de Ecommerce (Opciones Simples)

### Opción 1: Google Sheets + PayPal (Más Fácil)

#### Gestión de Productos con Google Sheets
1. **Crea una Google Sheet** con estas columnas:
   \`\`\`
   ID | Nombre | Precio | Descripción | Imagen | Stock | Categoría
   \`\`\`

2. **Publica la hoja como CSV**:
   - Archivo → Publicar en la web → CSV
   - Copia la URL pública

3. **Conecta en tu código**:
   \`\`\`tsx
   // lib/products.ts
   const SHEET_URL = 'https://docs.google.com/spreadsheets/d/TU_ID/export?format=csv'
   
   export async function getProducts() {
     const response = await fetch(SHEET_URL)
     const csv = await response.text()
     // Parsear CSV a JSON
     return parseCSV(csv)
   }
   \`\`\`

#### Pagos con PayPal (Sin configuración compleja)
\`\`\`tsx
// components/PayPalButton.tsx
import { PayPalButtons } from "@paypal/react-paypal-js"

export function PayPalButton({ amount, onSuccess }) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: { value: amount }
          }]
        })
      }}
      onApprove={onSuccess}
    />
  )
}
\`\`\`


### Opción 2: Airtable (Interfaz Visual)


1. **Crea una base en Airtable** con tabla "Productos"
2. **Usa la API de Airtable**:
   \`\`\`bash
   # Variables de entorno
   AIRTABLE_API_KEY=tu-api-key
   AIRTABLE_BASE_ID=tu-base-id
   \`\`\`

3. **Conecta en tu código**:
   \`\`\`tsx
   // lib/airtable.ts
   const AIRTABLE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Productos`
   
   export async function getProducts() {
     const response = await fetch(AIRTABLE_URL, {
       headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` }
     })
     return response.json()
   }
   \`\`\`

### Opción 3: JSON Local (Para empezar)

Crea un archivo `data/products.json`:
\`\`\`json
{
  "products": [
    {
      "id": "1",
      "name": "Obra de Arte 1",
      "price": 150000,
      "description": "Hermosa pintura local",
      "image": "/art-1.jpg",
      "stock": 1,
      "category": "pinturas"
    }
  ]
}
\`\`\`

## 💳 Opciones de Pago Simples

### 1. PayPal (Recomendado para empezar)
\`\`\`bash
npm install @paypal/react-paypal-js
\`\`\`

**Variables de entorno:**
\`\`\`bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=tu-client-id
\`\`\`

### 2. Stripe Elements (Más profesional)
\`\`\`bash
npm install @stripe/stripe-js @stripe/react-stripe-js
\`\`\`

**Variables de entorno:**
\`\`\`bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
\`\`\`

### 3. MercadoPago (Para Latinoamérica)
\`\`\`bash
npm install mercadopago
\`\`\`

**Variables de entorno:**
\`\`\`bash
MERCADOPAGO_ACCESS_TOKEN=tu-access-token
\`\`\`

## 📧 Gestión de Pedidos Simples

### Opción 1: EmailJS (Sin backend)
\`\`\`bash
npm install @emailjs/browser
\`\`\`

\`\`\`tsx
// Enviar pedido por email
import emailjs from '@emailjs/browser'

const sendOrder = (orderData) => {
  emailjs.send(
    'tu_service_id',
    'tu_template_id',
    orderData,
    'tu_public_key'
  )
}
\`\`\`

### Opción 2: Formspree (Formularios simples)
\`\`\`tsx
// components/OrderForm.tsx
<form action="https://formspree.io/f/tu-form-id" method="POST">
  <input name="producto" value={producto} />
  <input name="cantidad" value={cantidad} />
  <input name="email" type="email" required />
  <button type="submit">Enviar Pedido</button>
</form>
\`\`\`

## 🗄️ Almacenamiento de Imágenes Gratuito

### 1. Cloudinary (Gratis hasta 25GB)
\`\`\`bash
npm install cloudinary
\`\`\`

### 2. ImageKit (Gratis hasta 20GB)
\`\`\`bash
npm install imagekit
\`\`\`

### 3. GitHub como CDN (Completamente gratis)
- Sube imágenes a un repositorio público
- Usa las URLs raw de GitHub

## 🚀 Despliegue Gratuito

### Vercel (Recomendado)
1. Conecta tu repositorio GitHub
2. Deploy automático
3. Variables de entorno en el dashboard

### Netlify
1. Arrastra tu carpeta build
2. O conecta con GitHub
3. Deploy automático

### Railway (Con base de datos gratis)
1. Conecta GitHub
2. Incluye PostgreSQL gratis
3. Variables de entorno incluidas

## 📱 Funcionalidades Incluidas

- ✅ **Catálogo de productos** con filtros
- ✅ **Carrito de compras** (localStorage)
- ✅ **Checkout simplificado**
- ✅ **Gestión de inventario básica**
- ✅ Diseño responsive completo
- ✅ Paleta de colores cálida y terrosa
- ✅ Carrusel de imágenes sin texto superpuesto
- ✅ Navegación suave entre secciones
- ✅ Optimización de imágenes automática
- ✅ SEO optimizado
- ✅ Accesibilidad (WCAG 2.1)
- ✅ Modo oscuro incluido

## 🛠️ Configuración Paso a Paso

### 1. Configurar Productos (Google Sheets)
1. Crea una Google Sheet con tus productos
2. Publica como CSV
3. Actualiza la URL en `lib/products.ts`

### 2. Configurar Pagos (PayPal)
1. Crea cuenta en PayPal Developer
2. Obtén tu Client ID
3. Agrégalo a las variables de entorno

### 3. Configurar Emails (EmailJS)
1. Crea cuenta en EmailJS
2. Configura un template de email
3. Obtén tus IDs y agrégalos al código

### 4. Subir Imágenes
1. Sube tus imágenes a `public/`
2. O usa Cloudinary para mejor rendimiento
3. Actualiza las rutas en tu Google Sheet

## 💡 Tips para Empezar

1. **Empieza simple**: Usa JSON local y PayPal
2. **Crece gradualmente**: Migra a Google Sheets cuando tengas más productos
3. **Optimiza después**: Agrega Cloudinary cuando tengas muchas imágenes
4. **Monitorea**: Usa Google Analytics (gratis) para ver el tráfico

## 🆘 Soporte

- **Documentación**: Cada opción tiene links a documentación oficial
- **Comunidad**: Únete a Discord de Next.js para ayuda
- **Tutoriales**: YouTube tiene tutoriales para cada integración

---

**¡Tu galería ecommerce lista en minutos, no en días!** 🎨🛒
