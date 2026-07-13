import {chromium} from "@playwright/test";
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const checks=[];
for(const viewport of [{name:"desktop",width:1440,height:1000},{name:"mobile",width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/macro-calculator/",{waitUntil:"networkidle"});
  const summary=page.locator('nav[aria-label="Main navigation"] .nav-dropdown-label');
  const directoryHref=await summary.getAttribute("href");
  const visibleBeforeInteraction=await page.locator(".nav-dropdown-menu").isVisible();
  if(viewport.name==="mobile"){await page.getByRole("button",{name:/Menu/}).click();await page.getByRole("button",{name:"Toggle calculator links"}).click()}else await summary.hover();
  const dropdownLinks=await page.locator(".nav-dropdown-menu a").count();
  const dropdownVisible=await page.locator(".nav-dropdown-menu").isVisible();
  let closesAfterMouseLeave=null;if(viewport.name==="desktop"){await page.mouse.move(10,500);closesAfterMouseLeave=!(await page.locator(".nav-dropdown-menu").isVisible())}
  const summaryBox=await page.locator(".nav-dropdown-trigger").boundingBox();const chevronBox=await page.locator(".dropdown-chevron").boundingBox();
  const chevronAlignment=summaryBox&&chevronBox?Math.abs((summaryBox.y+summaryBox.height/2)-(chevronBox.y+chevronBox.height/2)):null;
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const firstResult=page.locator(".health-result.primary strong");const before=await firstResult.textContent();
  await page.getByLabel("Age",{exact:true}).fill("45");const after=await firstResult.textContent();
  const controls=await page.locator(".health-form input:not([type=radio]), .health-form select").evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height));
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/protein-calculator/",{waitUntil:"networkidle"});
  await page.getByLabel("Primary goal or activity").selectOption("strength");await page.getByLabel("Meals per day").selectOption("4");
  const proteinRange=await page.locator(".health-result.primary strong").textContent();const proteinOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await page.goto("http://127.0.0.1:3005/",{waitUntil:"networkidle"});const calculatorWidth=await page.locator(".calculator-section > .shell").evaluate(node=>node.getBoundingClientRect().width);const categoryHeaders=await page.getByRole("columnheader",{name:"Category",exact:true}).count();const tableCaption=await page.locator(".nutrition-table-caption").textContent();const tableScroll=await page.locator(".nutrition-table-scroll").evaluate(node=>node.scrollWidth-node.clientWidth);const captionOffset=await page.evaluate(()=>{const caption=document.querySelector(".nutrition-table-caption")?.getBoundingClientRect();const wrap=document.querySelector(".table-wrap")?.getBoundingClientRect();return caption&&wrap?Math.abs((caption.left+caption.width/2)-(wrap.left+wrap.width/2)):null});
  checks.push({viewport:viewport.name,directoryHref,dropdownLinks,visibleBeforeInteraction,dropdownVisible,closesAfterMouseLeave,overflow,liveResultChanged:before!==after,minimumControlHeight:Math.min(...controls),chevronAlignment,proteinRange,proteinOverflow,calculatorWidth,categoryHeaders,tableCaption,tableScroll,captionOffset});
  await page.close();
}
await browser.close();
console.log(JSON.stringify(checks,null,2));
