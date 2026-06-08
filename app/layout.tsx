import type { Metadata } from "next";
import { Oxanium, Montserrat } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisaDoc - Build Photo Relationship Context",
  description: "Compile and arrange evidence photos quickly for visas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-gray-900 font-body">
        {children}
      </body>
    </html>
  );
}