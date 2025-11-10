import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Gym Control - Management System",
  description: "Complete gym management system for members, staff, and operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
