import {defineConfig,devices} from "@playwright/test";
const channel=process.env.PLAYWRIGHT_USE_SYSTEM_EDGE==="1"?"msedge":undefined;
export default defineConfig({testDir:"./e2e",fullyParallel:true,use:{baseURL:"http://localhost:3000",trace:"on-first-retry"},webServer:{command:"npm run dev",url:"http://localhost:3000",reuseExistingServer:true,timeout:120000},projects:[{name:"chromium",use:{...devices["Desktop Chrome"],channel}},{name:"mobile",use:{...devices["iPhone 13"],browserName:"chromium",channel}}]});
