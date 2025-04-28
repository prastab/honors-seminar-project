import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Replace with Geist Sans/Mono if configured
import "./globals.css";

// Assuming Geist Sans/Mono fonts are configured via Tailwind or loaded here
const inter = Inter({ subsets: ["latin"] }); // Keep or replace with your font loading

export const metadata: Metadata = {
  title: "Film Dialogue Analysis: Scorsese vs. Tarantino",
  description: "A white paper analyzing emotion and morality in film dialogue using NLP.",
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'oklch(1 0 0)' }, // Match --background
  //   { media: '(prefers-color-scheme: dark)', color: 'oklch(0.141 0.005 285.823)' }, // Match dark --background
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Add class="dark" manually or via script if you want to default/toggle dark mode */}
      <body className={inter.className}> {/* Replace inter.className if using Geist */}
          {children}
      </body>
    </html>
  );
}