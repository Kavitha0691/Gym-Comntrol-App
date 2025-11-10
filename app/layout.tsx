import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Gym Control - Member Portal",
  description: "Your personal gym management portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
