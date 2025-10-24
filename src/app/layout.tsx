import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { SITE_DESCRIPTION, SITE_TITLE } from "./constants/global";

const dmSerif = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} font-serif antialiased`}
      >
        <Header />
        {children}
        <footer className="mt-12 w-full bg-[#18392b] py-4 text-center text-white">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} Jewellery App. All rights
            reserved.
          </span>
        </footer>
      </body>
    </html>
  );
}
