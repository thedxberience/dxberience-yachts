import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const IvyPresto = localFont({
  src: "../../public/fonts/Ivy Presto/Ivy Presto 3.otf",
  display: "swap",
  variable: "--font-ivy-presto",
});

const noah = localFont({
  src: "../../public/fonts/Noah/Noah Regular.otf",
  display: "swap",
  variable: "--font-noah",
});

export const metadata: Metadata = {
  title: "Yachts by Dxberience",
  description:
    "Select from our collection of luxury yachts and book your memorable experience today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IvyPresto.variable} ${noah.variable} font-noah antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
