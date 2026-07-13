import {chromium} from "@playwright/test";

const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const checks=[];
for(const viewport of [{name:"desktop",width:1440,height:1000},{name:"mobile",width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/macro-calculator/",{waitUntil:"networkidle"});
  const summary=page.locator('nav[aria-label="Main navigation"] .nav-dropdown-label');
  const directoryHref=await summary.getAttribute("href");
  const nutritionFactsHref=await page.getByRole("link",{name:"Nutrition Facts",exact:true}).first().getAttribute("href");
  const visibleBeforeInteraction=await page.locator(".nav-dropdown-menu").isVisible();
  if(viewport.name==="mobile"){
    await page.getByRole("button",{name:/Menu/}).click();
    await page.getByRole("button",{name:"Toggle calculator links"}).click();
  }else await summary.hover();
  const dropdownLinks=await page.locator(".nav-dropdown-menu a").count();
  const dropdownVisible=await page.locator(".nav-dropdown-menu").isVisible();
  let closesAfterMouseLeave=null;
  if(viewport.name==="desktop"){
    await page.mouse.move(10,500);
    closesAfterMouseLeave=!(await page.locator(".nav-dropdown-menu").isVisible());
  }
  const summaryBox=await page.locator(".nav-dropdown-trigger").boundingBox();
  const chevronBox=await page.locator(".dropdown-chevron").boundingBox();
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

  await page.goto("http://127.0.0.1:3005/bibibop-nutrition-facts/",{waitUntil:"networkidle"});
  const factsHeading=await page.getByRole("heading",{name:"BIBIBOP Nutrition Facts And Menu Calories"}).count();
  const tableCaption=await page.locator(".nutrition-table-caption").textContent();
  const tableRows=await page.locator(".nutrition-table tbody tr").count();
  const categoryLinks=await page.locator(".facts-category-nav a").count();
  const factsOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await page.getByPlaceholder("Search item or alias").fill("steak");
  const filteredTableRows=await page.locator(".nutrition-table tbody tr").count();

  checks.push({viewport:viewport.name,directoryHref,nutritionFactsHref,dropdownLinks,visibleBeforeInteraction,dropdownVisible,closesAfterMouseLeave,overflow,liveResultChanged:before!==after,minimumControlHeight:Math.min(...controls),chevronAlignment,proteinRange,proteinOverflow,calculatorWidth,homepageFullTable,summaryRows,fullDatabaseHref,showcaseCards,showcaseColumns,allCalculatorsHref,showcaseOrder,buttonOffset,factsHeading,tableCaption,tableRows,categoryLinks,factsOverflow,filteredTableRows});
  await page.close();
}
await browser.close();
console.log(JSON.stringify(checks,null,2));
