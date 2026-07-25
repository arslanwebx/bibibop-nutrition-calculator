import fs from "node:fs";

const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const home=fs.readFileSync("out/index.html","utf8");
const notFound=fs.readFileSync("out/404/index.html","utf8");
const sitemap=fs.readFileSync("out/sitemap.xml","utf8");
const humanSitemap=fs.readFileSync("out/sitemap/index.html","utf8");
const headers=fs.readFileSync("out/_headers","utf8");
const schemas=[...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
const schemaByType=type=>schemas.find(item=>item["@type"]===type);
const canonical=home.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const description=home.match(/<meta name="description" content="([^"]+)"/)?.[1];
const title=home.match(/<title>(.*?)<\/title>/)?.[1];
const visibleFaq=(home.match(/<section class="faq-section"[\s\S]*?<\/section>/)?.[0].match(/<details/g)??[]).length;

assert(title==="BIBIBOP Nutrition Calculator [Calories, Macros &amp; Allergens]","Homepage title changed unexpectedly");
assert(description?.length>=120&&description.length<=160,`Homepage description length is ${description?.length??0}`);
assert(canonical==="https://bibibopnutritioncalculator.pro/","Homepage canonical is incorrect");
assert((home.match(/<h1/g)??[]).length===1,"Homepage must contain exactly one H1");
assert(!home.includes('name="robots" content="noindex'),"Homepage is noindex");
for(const type of ["Organization","WebSite","WebPage","WebApplication","FAQPage"])assert(schemaByType(type),`Homepage is missing ${type} schema`);
assert(schemaByType("WebPage")?.about?.["@id"]===schemaByType("WebApplication")?.["@id"],"WebPage and WebApplication schema are not connected");
assert(schemaByType("FAQPage")?.mainEntity?.length===visibleFaq,"Visible and structured FAQs differ");
assert(notFound.includes('name="robots" content="noindex, nofollow"')||notFound.includes('name="robots" content="noindex"'),"404 output is not noindex");
assert(!notFound.includes('<link rel="canonical"'),"404 output should not declare a canonical");
assert(sitemap.includes("<lastmod>2026-07-25</lastmod>"),"Sitemap does not contain the current homepage/article update date");
assert((humanSitemap.match(/\/blog\/[^"]+\/"/g)??[]).length>=8,"Human sitemap is missing article links");
for(const domain of ["https://www.googletagmanager.com","https://www.google-analytics.com"])assert(headers.includes(domain),`CSP is missing ${domain}`);

console.log(JSON.stringify({title,descriptionLength:description.length,canonical,h1:1,schemaTypes:schemas.map(item=>item["@type"]),visibleFaq,homepageIndexable:true,notFoundNoindex:true,notFoundCanonical:false,sitemapFreshness:"PASS",humanSitemapArticles:"PASS",analyticsCsp:"PASS"},null,2));
