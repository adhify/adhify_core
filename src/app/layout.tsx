import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Adhify",
  description: "Deploy your applications with zero configuration",
  keywords: ["Next.js", "Supabase", "Deployment", "Zero Configuration"],
  icons: [{ rel: "icon", url: "/adhify_logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
