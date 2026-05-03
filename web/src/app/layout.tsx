import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "PlayJoy Toys | Portfolio - Safe, Fun & Educational Toy Showcase",
    template: "%s | PlayJoy Toys",
  },
  description:
    "PlayJoy Toys portfolio: browse toy concepts by category and age. Contact openrize@gmail.com or +1 (224) 377 9043 for pricing and details.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
