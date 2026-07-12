import type {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/content/PageShell";
import {authorConfig} from "@/config/author";
import {blogPosts} from "@/data/blog-posts";

export const metadata:Metadata={
  title:"M. Arsalan | Author And Editorial Reviewer",
  description:authorConfig.description,
  alternates:{canonical:authorConfig.path},
  openGraph:{title:"M. Arsalan | Author And Editorial Reviewer",description:authorConfig.description,url:authorConfig.url,type:"profile",images:[{url:authorConfig.image,width:512,height:512,alt:"Portrait placeholder for M. Arsalan"}]},
};

export default function AuthorPage(){
  const posts=blogPosts.filter(post=>post.authorSlug===authorConfig.slug);
  const personSchema={"@context":"https://schema.org","@type":"Person",name:authorConfig.name,url:authorConfig.url,image:authorConfig.imageUrl,description:authorConfig.description,knowsAbout:[...authorConfig.expertise],mainEntityOfPage:authorConfig.url};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema).replace(/</g,"\\u003c")}}/>
    <PageShell title={authorConfig.name} description="Author and editorial reviewer for the BIBIBOP Nutrition Calculator.">
      <section className="author-profile-intro"><Image className="author-profile-avatar" src={authorConfig.image} width="180" height="180" alt="Portrait placeholder for M. Arsalan"/><div><h2>Professional Biography</h2><p>M. Arsalan works on the research, data organization, calculator development, and editorial review behind this independent nutrition website. The role centers on turning publicly available restaurant nutrition information into clear, testable, and useful calculator outputs.</p><p>The work includes checking portions and nutrient fields, preserving source notation, documenting uncertainty, and reviewing explanations so official values and site interpretation remain distinct. No medical credentials, licenses, degrees, certifications, employers, or years of experience are claimed.</p></div></section>
      <section><h2>Areas Of Expertise</h2><ul className="expertise-grid">{authorConfig.expertise.map(area=><li key={area}>{area}</li>)}</ul></section>
      <section><h2>Editorial And Research Approach</h2><p>Research begins with the most complete available primary nutrition source. Values are checked as a single dataset rather than mixed across conflicting versions. Tokens such as “&lt;1” and “N/A” remain visible, while any calculation estimate is labeled separately.</p><p>Editorial review focuses on plain language, accurate comparisons, transparent limitations, and avoiding unsupported medical or health claims. Calculator examples are produced from the same central data and calculation functions used by the interactive tool.</p></section>
      <section><h2>Role On This Website</h2><p>M. Arsalan is responsible for nutrition research, food-data review, calculator logic review, and editorial oversight for published informational content. This role does not replace guidance from a qualified medical or dietary professional.</p><p><Link className="button" href="/#calculator">Use The BIBIBOP Nutrition Calculator</Link></p></section>
      <section className="author-posts"><h2>Published Blog Posts</h2>{posts.length?<div className="author-post-list">{posts.map(post=><article key={post.href}><h3><Link href={post.href}>{post.title}</Link></h3><p>{post.description}</p><time dateTime={post.publishedDate}>{post.publishedDate}</time></article>)}</div>:<div className="author-empty-state"><svg viewBox="0 0 180 120" aria-hidden="true"><rect x="28" y="14" width="124" height="92" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="3"/><path d="M52 44h76M52 65h60M52 86h70" stroke="#166534" strokeWidth="6" strokeLinecap="round"/></svg><h3>No Published Posts Yet</h3><p>Source-checked nutrition guides by M. Arsalan will appear here after publication. The calculator remains available now.</p><Link href="/#calculator">Go To The Calculator</Link></div>}</section>
    </PageShell>
  </>;
}
