import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google"; // Premium typography selection
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400", // Bebas only has 400, but it looks like 700/Display
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Ensure text remains visible
});

export const metadata: Metadata = {
  title: "WOOHOO",
  description: "Premium Gym Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
