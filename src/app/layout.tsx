import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), title:{default:siteConfig.title,template:`%s | ${siteConfig.shortName}`}, description:siteConfig.description,
  alternates:{canonical:"/"}, icons:{icon:"/favicon.svg",apple:"/apple-touch-icon.svg"}, manifest:"/manifest.webmanifest",
  openGraph:{type:"website",locale:"en_US",siteName:siteConfig.name,title:siteConfig.title,description:siteConfig.description,url:siteConfig.url,images:[{url:"/og-image.svg",width:1200,height:630,alt:"BIBIBOP Nutrition Calculator with an orange bowl and nutrition bars"}]},
  twitter:{card:"summary_large_image",title:siteConfig.title,description:siteConfig.description,images:["/og-image.svg"]},
};
export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#ffffff" };

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-US"><body><a className="skip-link" href="#main-content">Skip to main content</a><Header/><main id="main-content">{children}</main><Footer/><Script src="https://www.googletagmanager.com/gtag/js?id=G-M2FMDD6D8N" strategy="afterInteractive"/><Script id="google-analytics" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M2FMDD6D8N');
`}</Script></body></html>}
