import localFont from "next/font/local";
import "./globals.css";
import HeaderWithSidebar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActionButton from "@/components/layout/FloatingActionButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "JM visa",
  description: "JM visa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderWithSidebar/>
        {children}
        <FloatingActionButton/>
      </body>
    </html>
  );
}
