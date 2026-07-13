import {chromium} from "@playwright/test";

const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const checks=[];
for(const viewport of [{name:"desktop",width:1440,height:1000},{name:"mobile",width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/macro-calculator/",{waitUntil:"networkidle"});
  const summary=page.locator(".nav-dropdown:not(.blog-nav-dropdown) .nav-dropdown-label");
  const calculatorMenu=page.locator("#calculator-menu");
  const directoryHref=await summary.getAttribute("href");
  const nutritionFactsHref=await page.getByRole("link",{name:"Nutrition Facts",exact:true}).first().getAttribute("href");
  const visibleBeforeInteraction=await calculatorMenu.isVisible();
  if(viewport.name==="mobile"){
    await page.getByRole("button",{name:/Menu/}).click();
    await page.getByRole("button",{name:"Toggle calculator links"}).click();
  }else await summary.hover();
  const dropdownLinks=await calculatorMenu.locator("a").count();
  const dropdownVisible=await calculatorMenu.isVisible();
  let closesAfterMouseLeave=null;
  if(viewport.name==="desktop"){
    await page.mouse.move(10,500);
    closesAfterMouseLeave=!(await calculatorMenu.isVisible());
  }
  const summaryBox=await page.locator(".nav-dropdown:not(.blog-nav-dropdown) .nav-dropdown-trigger").boundingBox();
  const chevronBox=await page.locator(".nav-dropdown:not(.blog-nav-dropdown) .dropdown-chevron").boundingBox();
  const chevronAlignment=summaryBox&&chevronBox?Math.abs((summaryBox.y+summaryBox.height/2)-(chevronBox.y+chevronBox.height/2)):null;
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const firstResult=page.locator(".health-result.primary strong");
  const before=await firstResult.textContent();
  await page.getByLabel("Age",{exact:true}).fill("45");
  const after=await firstResult.textContent();
  const controls=await page.locator(".health-form input:not([type=radio]), .health-form select").evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height));

  await page.goto("http://127.0.0.1:3005/nutrition-calculators/protein-calculator/",{waitUntil:"networkidle"});
  await page.getByLabel("Primary goal or activity").selectOption("strength");
  await page.getByLabel("Meals per day").selectOption("4");
  const proteinRange=await page.locator(".health-result.primary strong").textContent();
  const proteinOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);

  await page.goto("http://127.0.0.1:3005/",{waitUntil:"networkidle"});
  const calculatorWidth=await page.locator(".calculator-section > .shell").evaluate(node=>node.getBoundingClientRect().width);
  const homepageFullTable=await page.locator(".nutrition-table").count();
  const summaryRows=await page.locator(".category-summary-table tbody tr").count();
  const fullDatabaseHref=await page.locator(".summary-database-link a").getAttribute("href");
  const showcaseCards=await page.locator(".showcase-card").count();
  const showcaseColumns=await page.locator(".showcase-grid").evaluate(node=>getComputedStyle(node).gridTemplateColumns.split(" ").length);
  const allCalculatorsHref=await page.locator(".showcase-all-link").getAttribute("href");
  const showcaseOrder=await page.evaluate(()=>{const faq=document.querySelector(".faq-section");const tools=document.querySelector(".tools-showcase");const final=[...document.querySelectorAll("h2")].find(node=>node.textContent==="A Practical Final Check")?.closest("section");return !!(faq&&tools&&final&&(faq.compareDocumentPosition(tools)&Node.DOCUMENT_POSITION_FOLLOWING)&&(tools.compareDocumentPosition(final)&Node.DOCUMENT_POSITION_FOLLOWING))});
  const buttonOffset=await page.evaluate(()=>{const button=document.querySelector(".showcase-all-link")?.getBoundingClientRect();const shell=document.querySelector(".tools-showcase .shell")?.getBoundingClientRect();return button&&shell?Math.abs((button.left+button.width/2)-(shell.left+shell.width/2)):null});
  const containerMetrics=await page.evaluate(()=>{const box=(selector)=>{const rect=document.querySelector(selector)?.getBoundingClientRect();return rect?{left:rect.left,width:rect.width,center:rect.left+rect.width/2}:null};const header=box(".header-inner");const article=box(".article");const examples=box(".examples-section");const nav=box("#site-nav");return {header,article,examples,nav,centerDelta:header&&article?Math.abs(header.center-article.center):null}});

  await page.goto("http://127.0.0.1:3005/bibibop-nutrition-facts/",{waitUntil:"networkidle"});
  const factsHeading=await page.getByRole("heading",{name:"BIBIBOP Nutrition Facts And Menu Calories"}).count();
  const tableCaption=await page.locator(".nutrition-table-caption").textContent();
  const tableRows=await page.locator(".nutrition-table tbody tr").count();
  const categoryLinks=await page.locator(".facts-category-nav a").count();
  const factsOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const factsShellWidth=await page.locator(".nutrition-facts-shell").evaluate(node=>node.getBoundingClientRect().width);
  await page.getByPlaceholder("Search item or alias").fill("steak");
  const filteredTableRows=await page.locator(".nutrition-table tbody tr").count();

  await page.goto("http://127.0.0.1:3005/blog/",{waitUntil:"networkidle"});
  const blogTitle=await page.title();
  const blogCanonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  const blogH1=await page.locator("h1").count();
  const blogCards=await page.locator(".blog-category-card").count();
  const blogColumns=await page.locator(".blog-category-grid").evaluate(node=>getComputedStyle(node).gridTemplateColumns.split(" ").length);
  const blogCategoryHrefs=await page.locator(".blog-category-card > a").evaluateAll(nodes=>nodes.map(node=>node.getAttribute("href")));
  const blogEmptyMessage=await page.locator(".blog-empty-state").textContent();
  const blogNavLabel=page.locator(".blog-nav-dropdown .nav-dropdown-label");
  const blogMenuVisibleBefore=await page.locator("#blog-menu").isVisible();
  if(viewport.name==="mobile"){
    await page.getByRole("button",{name:/Menu/}).click();
    await page.getByRole("button",{name:"Toggle blog categories"}).click();
  }else await blogNavLabel.hover();
  const blogMenuVisible=await page.locator("#blog-menu").isVisible();
  const blogMenuLinks=await page.locator("#blog-menu a").count();
  let blogKeyboardFocus=null;
  if(viewport.name==="desktop"){
    await page.mouse.move(10,500);
    await blogNavLabel.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    blogKeyboardFocus=await page.evaluate(()=>document.activeElement?.textContent?.trim());
  }
  await page.goto("http://127.0.0.1:3005/blog/nutrition-guides/",{waitUntil:"networkidle"});
  const categoryH1=await page.locator("h1").count();
  const categoryCanonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  const categoryNoindex=await page.locator('meta[name="robots"][content*="noindex"]').count();
  const categoryEmptyMessage=await page.locator(".blog-empty-state").textContent();
  const relatedCategoryLinks=await page.locator(".related-category-grid a").count();
  const categoryCalculatorHref=await page.locator(".blog-calculator-cta a").getAttribute("href");
  const activeBlogCategory=await page.locator("#blog-menu a[aria-current='page']").textContent();
  const blogOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const blogShellWidth=await page.locator(".blog-shell").first().evaluate(node=>node.getBoundingClientRect().width);

  await page.goto("http://127.0.0.1:3005/blog/comparisons/",{waitUntil:"networkidle"});
  const comparisonsH1=await page.locator("h1").count();
  const comparisonChildCards=await page.locator(".comparison-child-grid > a").count();
  const comparisonChildHrefs=await page.locator(".comparison-child-grid > a").evaluateAll(nodes=>nodes.map(node=>node.getAttribute("href")));
  const comparisonsCanonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  const comparisonsArticleCards=await page.locator(".blog-post-card").count();
  const comparisonsSchemaTypes=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(node=>JSON.parse(node.textContent||"{}")["@type"]));
  await page.goto("http://127.0.0.1:3005/blog/comparisons/meal-comparisons/",{waitUntil:"networkidle"});
  const childH1=await page.locator("h1").count();
  const childCanonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  const childBreadcrumb=await page.locator(".breadcrumbs").textContent();
  const childRelatedHrefs=await page.locator(".related-category-grid a").evaluateAll(nodes=>nodes.map(node=>node.getAttribute("href")));
  const childArticleCards=await page.locator(".blog-post-card").count();
  const childOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);

  checks.push({viewport:viewport.name,directoryHref,nutritionFactsHref,dropdownLinks,visibleBeforeInteraction,dropdownVisible,closesAfterMouseLeave,overflow,liveResultChanged:before!==after,minimumControlHeight:Math.min(...controls),chevronAlignment,proteinRange,proteinOverflow,calculatorWidth,homepageFullTable,summaryRows,fullDatabaseHref,showcaseCards,showcaseColumns,allCalculatorsHref,showcaseOrder,buttonOffset,containerMetrics,factsHeading,tableCaption,tableRows,categoryLinks,factsOverflow,factsShellWidth,filteredTableRows,blogTitle,blogCanonical,blogH1,blogCards,blogColumns,blogCategoryHrefs,blogEmptyMessage,blogMenuVisibleBefore,blogMenuVisible,blogMenuLinks,blogKeyboardFocus,categoryH1,categoryCanonical,categoryNoindex,categoryEmptyMessage,relatedCategoryLinks,categoryCalculatorHref,activeBlogCategory,blogOverflow,blogShellWidth,comparisonsH1,comparisonChildCards,comparisonChildHrefs,comparisonsCanonical,comparisonsArticleCards,comparisonsSchemaTypes,childH1,childCanonical,childBreadcrumb,childRelatedHrefs,childArticleCards,childOverflow});
  await page.close();
}
const tabletPage=await browser.newPage({viewport:{width:820,height:1000}});
await tabletPage.goto("http://127.0.0.1:3005/blog/",{waitUntil:"networkidle"});
checks.push({viewport:"tablet-blog",blogColumns:await tabletPage.locator(".blog-category-grid").evaluate(node=>getComputedStyle(node).gridTemplateColumns.split(" ").length),overflow:await tabletPage.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth),wideElements:await tabletPage.evaluate(()=>[...document.querySelectorAll("body *")].map(node=>({tag:node.tagName,className:typeof node.className==="string"?node.className:"",right:node.getBoundingClientRect().right,width:node.getBoundingClientRect().width})).filter(item=>item.right>document.documentElement.clientWidth+.5).slice(0,12))});
await tabletPage.close();
await browser.close();
console.log(JSON.stringify(checks,null,2));
