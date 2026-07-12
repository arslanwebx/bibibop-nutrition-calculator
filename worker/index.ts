import {onRequest as contact} from "../functions/api/contact";
import {onRequest as subscribe} from "../functions/api/subscribe";
import type {Env} from "../functions/api/_shared";

interface WorkerEnv extends Env { ASSETS: { fetch(request:Request):Promise<Response> } }
const worker = {
  async fetch(request:Request,env:WorkerEnv):Promise<Response>{
    const pathname=new URL(request.url).pathname.replace(/\/$/,"");
    if(pathname==="/api/contact")return contact({request,env});
    if(pathname==="/api/subscribe")return subscribe({request,env});
    return env.ASSETS.fetch(request);
  },
};
export default worker;
