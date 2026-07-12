import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import PageShell from "@/components/content/PageShell";
import HealthCalculator from "@/components/calculators/HealthCalculator";
import {calculatorBySlug,calculatorHref,calculatorTools,type CalculatorSlug} from "@/data/health-calculators";
import {calculatorCopy} from "@/data/health-calculator-copy";
import {siteConfig} from "@/config/site";

export const dynamicParams=false;
export function generateStaticParams(){return calculatorTools.map(tool=>({slug:tool.slug}))}
function isSlug(value:string):value is CalculatorSlug{return value in calculatorBySlug}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;if(!isSlug(slug))return{};const tool=calculatorBySlug[slug];const url=calculatorHref(slug);
  return {title:tool.name,description:tool.shortDescription,alternates:{canonical:url},openGraph:{title:tool.name,description:tool.shortDescription,url,type:"website"},twitter:{card:"summary",title:tool.name,description:tool.shortDescription}};
}

export default async function CalculatorPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;if(!isSlug(slug))notFound();const tool=calculatorBySlug[slug];const copy=calculatorCopy[slug];
  const jsonLd=[{"@context":"https://schema.org","@type":"WebApplication",name:tool.name,url:`${siteConfig.url}${calculatorHref(slug)}`,description:tool.shortDescription,applicationCategory:"HealthApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:"USD"}},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:copy.faqs.map(faq=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))}];
  const related=calculatorTools.filter(item=>item.slug!==slug).slice(0,3);
  return <>
    {jsonLd.map((data,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}}/>)}
    <PageShell title={tool.name} description={tool.shortDescription}>
      <p className="calculator-answer"><strong>Answer:</strong> {copy.answer}</p>
      <HealthCalculator type={slug}/>
      <p className="calculator-review">Method and limitations reviewed by <Link href="/author/m-arslan/">M. Arsalan</Link>. Last reviewed July 12, 2026.</p>
      <div className="calculator-article">{copy.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.body}</section>)}</div>
      <section className="tool-faq" aria-labelledby="calculator-faq-heading"><h2 id="calculator-faq-heading">Frequently asked questions</h2>{copy.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <section className="related-tools" aria-labelledby="related-tools-heading"><h2 id="related-tools-heading">Related calculators</h2><div className="related-tool-grid">{related.map(item=><Link href={calculatorHref(item.slug)} key={item.slug}><strong>{item.name}</strong><span>{item.shortDescription}</span></Link>)}</div><Link className="all-tools-link" href="/nutrition-calculators/">View all nutrition calculators</Link></section>
    </PageShell>
  </>;
}
