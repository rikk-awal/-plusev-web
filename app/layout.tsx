import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlusEV | Next-Gen Software Solutions",
  description: "Crafting bespoke digital solutions that drive innovation and fuel sustainable growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}