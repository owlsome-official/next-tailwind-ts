import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";

const font = IBM_Plex_Sans_Thai({
  weight: ["400", "600"],
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "REPLACE_WITH_YOUR_PROJECT_NAME",
  description: "Powered by owlsome-official/next-tailwind-ts",
};
export const viewport: Viewport = {
  themeColor: "#FFBE98",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "antialiased")}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-tr from-primary to-accent p-8 sm:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
