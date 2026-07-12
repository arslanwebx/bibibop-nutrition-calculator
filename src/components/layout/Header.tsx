"use client";
import Link from "next/link";
import { useState } from "react";

export function Logo() {
  return <span className="logo"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 26h34c-2 10-8 15-17 15S9 36 7 26Z" fill="#f97316"/><path d="M13 21h22" stroke="#172033" strokeWidth="3" strokeLinecap="round"/><path d="M17 17v-5M24 17V8M31 17v-8" stroke="#3f7d5a" strokeWidth="4" strokeLinecap="round"/></svg><span>BIBIBOP <b>Nutrition Calculator</b></span></span>;
}

export default function Header() {
  const [open,setOpen]=useState(false);
  return <header className="site-header"><div className="shell header-inner"><Link href="/" aria-label="BIBIBOP Nutrition Calculator home"><Logo/></Link><button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(!open)}>Menu</button><nav id="site-nav" className={open ? "nav open":"nav"} aria-label="Main navigation"><Link href="/#calculator">Calculator</Link><Link href="/#nutrition-table">Nutrition facts</Link><Link href="/data-sources-methodology/">Methodology</Link><Link href="/about/">About</Link><Link href="/contact/">Contact</Link></nav></div></header>;
}
