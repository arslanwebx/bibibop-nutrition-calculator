export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  SITE_URL?: string;
}
export type PagesContext = { request: Request; env: Env };
const json=(message:string,status=200)=>new Response(JSON.stringify({message}),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
export const response={json};
export const clean=(value:unknown,max:number)=>typeof value==="string"?value.trim().slice(0,max):"";
export const validEmail=(value:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)&&value.length<=254;
export const escapeHtml=(value:string)=>value.replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]!));
export function allowedOrigin(request:Request,siteUrl:string){const origin=request.headers.get("Origin");if(!origin)return false;try{const host=new URL(origin).hostname;return origin===new URL(siteUrl).origin||host.endsWith(".pages.dev")}catch{return false}}
export async function verifyTurnstile(token:string,secret:string,request:Request){if(!token)return false;const body=new FormData();body.set("secret",secret);body.set("response",token);const ip=request.headers.get("CF-Connecting-IP");if(ip)body.set("remoteip",ip);try{const result=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body,signal:AbortSignal.timeout(8000)});if(!result.ok)return false;const data=await result.json() as {success?:boolean};return data.success===true}catch{return false}}
export function looksAbusive(value:string){const links=(value.match(/https?:\/\/|www\./gi)||[]).length;return links>4||/(?:crypto giveaway|casino bonus|buy followers)/i.test(value)}
export async function sendEmail(env:Env,payload:{subject:string;html:string;text:string;replyTo:string}){try{const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],subject:payload.subject,html:payload.html,text:payload.text,reply_to:payload.replyTo}),signal:AbortSignal.timeout(12000)});return res.ok}catch{return false}}
export function configured(env:Env){return Boolean(env.RESEND_API_KEY&&env.CONTACT_TO_EMAIL&&env.CONTACT_FROM_EMAIL&&env.SITE_URL)}
