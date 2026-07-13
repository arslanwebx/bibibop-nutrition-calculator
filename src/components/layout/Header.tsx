"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {calculatorHref,calculatorTools} from "@/data/health-calculators";
import {blogCategories,blogCategoryHref} from "@/data/blog-categories";

export function Logo(){return <span className="logo"><span className="logo-mark"><svg viewBox="0 0 56 56" aria-hidden="true"><path d="M8 29h40c-2.7 12.8-10 19-20 19S10.7 41.8 8 29Z" fill="currentColor"/><path d="M14 25h28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/><path d="M18 20V14M28 20V8M38 20V12" stroke="#166534" strokeWidth="4.5" strokeLinecap="round"/></svg></span><span className="logo-copy"><b>BIBIBOP</b><span>Nutrition Calculator</span></span></span>}

export default function Header(){
  const pathname=usePathname();
  const currentPath=pathname==="/"?"/":pathname.replace(/\/$/,"");
  const [open,setOpen]=useState(false);
  const [calculatorsOpen,setCalculatorsOpen]=useState(false);
  const [blogOpen,setBlogOpen]=useState(false);
  const desktopHover=()=>window.matchMedia("(min-width: 841px) and (hover: hover)").matches;
  const closeMenu=()=>{setOpen(false);setCalculatorsOpen(false);setBlogOpen(false)};
  const calculatorActive=currentPath.startsWith("/nutrition-calculators");
  const blogActive=currentPath==="/blog"||currentPath.startsWith("/blog/");
  const calculatorEvents={
    onMouseEnter:()=>{if(desktopHover()){setCalculatorsOpen(true);setBlogOpen(false)}},
    onMouseLeave:()=>{if(desktopHover())setCalculatorsOpen(false)},
    onFocusCapture:()=>{if(desktopHover()){setCalculatorsOpen(true);setBlogOpen(false)}},
  };
  const blogEvents={
    onMouseEnter:()=>{if(desktopHover()){setBlogOpen(true);setCalculatorsOpen(false)}},
    onMouseLeave:()=>{if(desktopHover())setBlogOpen(false)},
    onFocusCapture:()=>{if(desktopHover()){setBlogOpen(true);setCalculatorsOpen(false)}},
  };
  return <header className="site-header"><div className="shell header-inner">
    <Link className="brand-link" href="/" aria-label="BIBIBOP Nutrition Calculator home"><Logo/></Link>
    <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(!open)}><span>Menu</span><span className="menu-lines" aria-hidden="true"/></button>
    <nav id="site-nav" className={open?"nav open":"nav"} aria-label="Main navigation">
      <Link href="/" aria-current={currentPath==="/"?"page":undefined} onClick={closeMenu}>Home</Link>
      <Link href="/bibibop-nutrition-facts/" aria-current={currentPath.startsWith("/bibibop-nutrition-facts")?"page":undefined} onClick={closeMenu}>Nutrition Facts</Link>
      <div className={`nav-dropdown${calculatorsOpen?" open":""}${calculatorActive?" current":""}`} {...calculatorEvents} onBlurCapture={event=>{if(desktopHover()&&!event.currentTarget.contains(event.relatedTarget))setCalculatorsOpen(false)}}>
        <div className="nav-dropdown-trigger"><Link className="nav-dropdown-label" href="/nutrition-calculators/" aria-current={currentPath==="/nutrition-calculators"?"page":undefined} onClick={closeMenu}>More Calculators</Link><button className="nav-dropdown-toggle" type="button" aria-label="Toggle calculator links" aria-expanded={calculatorsOpen} aria-controls="calculator-menu" onClick={()=>{setCalculatorsOpen(value=>!value);setBlogOpen(false)}}><span className="dropdown-chevron" aria-hidden="true"/></button></div>
        <div className="nav-dropdown-menu" id="calculator-menu"><Link href="/nutrition-calculators/" aria-current={currentPath==="/nutrition-calculators"?"page":undefined} onClick={closeMenu}><strong>All Nutrition Calculators</strong></Link>{calculatorTools.map(tool=><Link href={calculatorHref(tool.slug)} aria-current={currentPath===calculatorHref(tool.slug).slice(0,-1)?"page":undefined} onClick={closeMenu} key={tool.slug}>{tool.name}</Link>)}</div>
      </div>
      <div className={`nav-dropdown blog-nav-dropdown${blogOpen?" open":""}${blogActive?" current":""}`} {...blogEvents} onBlurCapture={event=>{if(desktopHover()&&!event.currentTarget.contains(event.relatedTarget))setBlogOpen(false)}}>
        <div className="nav-dropdown-trigger"><Link className="nav-dropdown-label" href="/blog/" aria-current={currentPath==="/blog"?"page":undefined} onClick={closeMenu}>Blog</Link><button className="nav-dropdown-toggle" type="button" aria-label="Toggle blog categories" aria-expanded={blogOpen} aria-controls="blog-menu" onClick={()=>{setBlogOpen(value=>!value);setCalculatorsOpen(false)}}><span className="dropdown-chevron" aria-hidden="true"/></button></div>
        <div className="nav-dropdown-menu blog-dropdown-menu" id="blog-menu"><Link href="/blog/" aria-current={currentPath==="/blog"?"page":undefined} onClick={closeMenu}><strong>All Guides</strong></Link>{blogCategories.map(category=>{const categoryPath=blogCategoryHref(category.slug).slice(0,-1);return <Link href={blogCategoryHref(category.slug)} aria-current={currentPath===categoryPath||currentPath.startsWith(`${categoryPath}/page/`)?"page":undefined} onClick={closeMenu} key={category.slug}>{category.name}</Link>})}</div>
      </div>
      <Link href="/about/" aria-current={currentPath.startsWith("/about")?"page":undefined} onClick={closeMenu}>About</Link>
    </nav>
  </div></header>;
}
