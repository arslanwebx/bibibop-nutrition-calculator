import {chromium} from "@playwright/test";
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"});
const checks=[];
for(const viewport of [{name:"desktop",width:1440,height:1000},{name:"mobile",width:390,height:844}]){
  const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height}});
  await page.goto("http://127.0.0.1:3005/nutrition-calculators/calorie-calculator/",{waitUntil:"networkidle"});
  if(viewport.name==="mobile")await page.getByRole("button",{name:/Menu/}).click();
  await page.getByText("More Calculators",{exact:false}).first().click();
  const dropdownLinks=await page.locator(".nav-dropdown-menu a").count();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  const firstResult=page.locator(".health-result.primary strong");const before=await firstResult.textContent();
  await page.getByLabel("Age").fill("45");const after=await firstResult.textContent();
  const controls=await page.locator(".health-form input:not([type=radio]), .health-form select").evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height));
  checks.push({viewport:viewport.name,dropdownLinks,overflow,liveResultChanged:before!==after,minimumControlHeight:Math.min(...controls)});
  await page.close();
}
await browser.close();
console.log(JSON.stringify(checks,null,2));
