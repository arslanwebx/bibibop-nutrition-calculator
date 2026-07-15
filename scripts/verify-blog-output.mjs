import fs from "node:fs";
import path from "node:path";

const slugs=["bibibop-calories-and-nutrition-guide","bibibop-menu-first-time-ordering-guide","calories-vs-macros-restaurant-bowl","bibibop-proteins-compared","bibibop-vs-chipotle-nutrition-comparison"];
const expectedCategoryCounts={
  "out/blog/index.html":5,
  "out/blog/nutrition-guides/index.html":1,
  "out/blog/ordering-guides/index.html":1,
  "out/blog/nutrition-education/index.html":1,
  "out/blog/comparisons/index.html":2,
  "out/blog/comparisons/meal-comparisons/index.html":1,
  "out/blog/comparisons/restaurant-comparisons/index.html":1,
};
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const plainText=html=>html.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ").replace(/&(?:[a-z]+|#\d+);/gi," ").replace(/\s+/g," ").trim();
const routeFile=href=>{const clean=href.split("#")[0].split("?")[0];if(!clean||clean==="/")return "out/index.html";return path.join("out",clean,"index.html")};
const results=[];
for(const slug of slugs){
  const file=path.join("out","blog",slug,"index.html");assert(fs.existsSync(file),`Missing article output: ${slug}`);const html=fs.readFileSync(file,"utf8");
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
  const schemaTypes=schemas.map(item=>item["@type"]);const faq=schemas.find(item=>item["@type"]==="FAQPage");const article=schemas.find(item=>item["@type"]==="BlogPosting");
  const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];const robots=html.match(/name="robots" content="([^"]+)"/)?.[1];
  const body=html.match(/<div class="blog-article-body">([\s\S]*?)<section class="article-faq"/)?.[1]??"";const words=plainText(body).split(" ").filter(Boolean).length;
  const visibleFaq=(html.match(/<details/g)??[]).length;const h1=(html.match(/<h1/g)??[]).length;
  assert(h1===1,`${slug} has ${h1} H1 elements`);assert(canonical===`https://bibibopnutritioncalculator.pro/blog/${slug}/`,`${slug} canonical is incorrect`);assert(robots?.includes("index")&&robots.includes("follow"),`${slug} is not index, follow`);
  for(const required of ["BlogPosting","BreadcrumbList","Person","Organization","FAQPage"])assert(schemaTypes.includes(required),`${slug} is missing ${required} schema`);
  assert(article?.url===canonical,`${slug} Article URL does not match canonical`);assert(faq?.mainEntity.length===visibleFaq,`${slug} visible and schema FAQs differ`);
  const localLinks=[...html.matchAll(/<a[^>]+href="(\/[^"]*)"/g)].map(match=>match[1]).filter(href=>!href.startsWith("//"));
  const broken=[...new Set(localLinks)].filter(href=>!fs.existsSync(routeFile(href)));assert(!broken.length,`${slug} has broken internal links: ${broken.join(", ")}`);
  const imageSources=[...html.matchAll(/(?:src|href)="(\/blog\/[^"]+\.(?:webp|svg))"/g)].map(match=>path.join("public",match[1]));for(const image of imageSources)assert(fs.existsSync(image),`${slug} references missing image ${image}`);
  results.push({slug,words,h1,canonical,faq:visibleFaq,schemaTypes});
}
const sitemap=fs.readFileSync("out/sitemap.xml","utf8");for(const slug of slugs)assert((sitemap.match(new RegExp(slug,"g"))??[]).length===1,`${slug} is not present exactly once in sitemap.xml`);
for(const [file,count] of Object.entries(expectedCategoryCounts)){assert(fs.existsSync(file),`Missing archive ${file}`);const html=fs.readFileSync(file,"utf8");assert((html.match(/class="blog-post-card"/g)??[]).length===count,`${file} expected ${count} cards`)}
for(const image of fs.readdirSync("public/blog").filter(file=>file.endsWith(".webp"))){const size=fs.statSync(path.join("public/blog",image)).size;assert(size<180*1024,`${image} exceeds 180 KB`)}
console.log(JSON.stringify({articles:results,archives:expectedCategoryCounts,sitemap:"PASS",internalLinks:"PASS",images:"PASS"},null,2));
