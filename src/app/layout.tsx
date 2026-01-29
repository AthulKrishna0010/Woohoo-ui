import type { Metadata } from "next";
import Footer from "@/components/Footer";
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
  title: {
    default: "WooHoo Health Club | Premium Fitness & Gym in Indiranagar",
    template: "%s | WooHoo Health Club",
  },
  description: "Experience Bangalore's premier fitness destination. WooHoo Health Club offers 9,000 sq ft of elite equipment, expert personal training, and a vibrant community in Indiranagar.",
  keywords: ["Gym Indiranagar", "Premium Fitness Bangalore", "Personal Training", "Best Gym in Bangalore", "WooHoo Health Club", "Elite Gym Equipment", "Fitness Community"],
  authors: [{ name: "WooHoo Health Club" }],
  creator: "WooHoo Health Club",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.woohoohealthclub.com",
    title: "WooHoo Health Club | Premium Fitness & Gym in Indiranagar",
    description: "Join the best gym in Indiranagar. Elite equipment, expert trainers, and a community driven by results.",
    siteName: "WooHoo Health Club",
    images: [
      {
        url: "/woohoo-footer.png", // Using an existing image as fallback OG image
        width: 1200,
        height: 630,
        alt: "WooHoo Health Club - Premium Fitness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WooHoo Health Club | Premium Fitness & Gym in Indiranagar",
    description: "Join the best gym in Indiranagar. Elite equipment, expert trainers, and a community driven by results.",
    images: ["/woohoo-footer.png"],
    creator: "@WooHooFitness1", // Using the YouTube handle/branding if Twitter exists or generic
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <Footer />
      </body>
    </html>
  );
}