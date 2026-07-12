"use client";
import Link from "next/link";
import { useState } from "react";

export function Logo() {
  return <span className="logo"><span className="logo-mark"><svg viewBox="0 0 56 56" aria-hidden="true"><path d="M8 29h40c-2.7 12.8-10 19-20 19S10.7 41.8 8 29Z" fill="currentColor"/><path d="M14 25h28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/><path d="M18 20V14M28 20V8M38 20V12" stroke="#166534" strokeWidth="4.5" strokeLinecap="round"/></svg></span><span className="logo-copy"><b>BIBIBOP</b><span>Nutrition Calculator</span></span></span>;
}

export default function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header"><div className="shell header-inner"><Link className="brand-link" href="/" aria-label="BIBIBOP Nutrition Calculator home"><Logo/></Link><button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(!open)}><span>Menu</span><span className="menu-lines" aria-hidden="true"/></button><nav id="site-nav" className={open ? "nav open":"nav"} aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#calculator">Calculator</Link><Link href="/#nutrition-table">Nutrition Facts</Link><Link href="/blog/">Blog</Link><Link href="/about/">About</Link><Link className="nav-cta" href="/contact/">Contact</Link></nav></div></header>;
}
