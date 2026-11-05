import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "For Poulami ✨ | A little world made for you",
  description: "A little birthday universe, made with love by Prem.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
