import "./globals.css"

export const metadata = {
  title: "csspen",
  description: "Logos famosos animados paso a paso con CSS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
