import {chromium} from "@playwright/test";
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const checks=[];
for(const viewport of [{name:"desktop",width:1440,height:1000},{name:"mobile",width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/macro-calculator/",{waitUntil:"networkidle"});
  const summary=page.getByText("More Calculators",{exact:false}).first();
  if(viewport.name==="mobile"){await page.getByRole("button",{name:/Menu/}).click();await summary.click()}else await summary.hover();
  const dropdownLinks=await page.locator(".nav-dropdown-menu a").count();
  const summaryBox=await page.locator(".nav-dropdown summary").boundingBox();const chevronBox=await page.locator(".dropdown-chevron").boundingBox();
  const chevronAlignment=summaryBox&&chevronBox?Math.abs((summaryBox.y+summaryBox.height/2)-(chevronBox.y+chevronBox.height/2)):null;
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const firstResult=page.locator(".health-result.primary strong");const before=await firstResult.textContent();
  await page.getByLabel("Age",{exact:true}).fill("45");const after=await firstResult.textContent();
  const controls=await page.locator(".health-form input:not([type=radio]), .health-form select").evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height));
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/protein-calculator/",{waitUntil:"networkidle"});
  await page.getByLabel("Primary goal or activity").selectOption("strength");await page.getByLabel("Meals per day").selectOption("4");
  const proteinRange=await page.locator(".health-result.primary strong").textContent();const proteinOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  checks.push({viewport:viewport.name,dropdownLinks,overflow,liveResultChanged:before!==after,minimumControlHeight:Math.min(...controls),chevronAlignment,proteinRange,proteinOverflow});
  await page.close();
}
await browser.close();
console.log(JSON.stringify(checks,null,2));
