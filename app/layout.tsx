import "./globals.css";
import { NextAuthProvider, DnDProvider } from "./providers";

export const metadata = {
  title: "Skirmish.io",
  description: "gaming community tournament app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full text-white dark:text-slate-300">
        <NextAuthProvider>
          <DnDProvider>{children}</DnDProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
