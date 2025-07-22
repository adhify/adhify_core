import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CloudDeploy - Deploy Apps with Zero Configuration",
  description: "The fastest way to deploy your applications, databases, and services.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
