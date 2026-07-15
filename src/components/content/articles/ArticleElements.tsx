import Image from "next/image";
import type {BlogImage} from "@/data/blog-posts";

export function ArticleFigure({image}:{image:BlogImage}){return <figure className="article-inline-image"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" sizes="(max-width: 760px) calc(100vw - 52px), 720px"/>{image.caption&&<figcaption>{image.caption}</figcaption>}</figure>}
export function SourceNote({children}:{children:React.ReactNode}){return <aside className="article-source-note"><strong>Source note</strong><p>{children}</p></aside>}
export function KeyAnswer({children}:{children:React.ReactNode}){return <div className="article-key-answer">{children}</div>}
export function ResponsiveTable({children,caption}:{children:React.ReactNode;caption:string}){return <div className="article-table-wrap" role="region" aria-label={caption} tabIndex={0}><table><caption>{caption}</caption>{children}</table></div>}
