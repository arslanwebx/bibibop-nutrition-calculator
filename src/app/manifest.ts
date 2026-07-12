import type {MetadataRoute} from "next";
export const dynamic = "force-static";
export default function manifest():MetadataRoute.Manifest{return {name:"BIBIBOP Nutrition Calculator",short_name:"BIBIBOP Calculator",description:"Independent BIBIBOP bowl nutrition calculator",start_url:"/",display:"standalone",background_color:"#fff8f1",theme_color:"#f97316",icons:[{src:"/favicon.svg",sizes:"any",type:"image/svg+xml"},{src:"/apple-touch-icon.svg",sizes:"180x180",type:"image/svg+xml"}]}}
