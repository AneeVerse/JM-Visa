import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/layout/Header";
import Script from "next/script";

import NextTopLoader from "nextjs-toploader";
import FloatingActionButton from "../components/layout/FloatingActionButton";

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
  title: "JM Visa Services",
  description: "JM Visa Services",
  // Add favicon icon and device-specific icons
  icons: {
    icon: "/favicon.ico", // Default favicon
    apple: "/apple-touch-icon.png", // Apple touch icon
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest", // Optional: Link to your manifest.json file
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">

{/* <!-- Google tag (gtag.js) --> */}
<head>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-FRJ05XSJ3S"></Script>
<Script id="google-analytics">
 {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FRJ05XSJ3S');`
 }
  </Script>

</head>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-FRJ05XSJ3S"></Script>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <NextTopLoader
         color="#0e2f50"
         initialPosition={0.08}
         height={3}
         showSpinner={false}
         easing="ease"
         speed={500}
         shadow="0 0 10px #2299DD,0 0 5px #2299DD"
         />
        <Header/>
        {children}
        <FloatingActionButton/>
      </body>
    </html>
  );
}
