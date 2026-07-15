import Link from "next/link";
import Image from "next/image";
import { authorConfig } from "@/config/author";

export default function AuthorBox({className=""}:{className?:string}) {
  return <aside className={`author-box ${className}`.trim()} aria-labelledby="author-box-title">
    <Image className="author-avatar" src={authorConfig.image} width="112" height="112" alt="Orange abstract portrait for M. Arsalan"/>
    <div className="author-box-copy">
      <p className="author-label" id="author-box-title">Researched And Written By</p>
      <h2>{authorConfig.name}</h2>
      <p>{authorConfig.shortBio}</p>
      <Link className="author-link" href={authorConfig.path}>View Full Author Profile <span aria-hidden="true">→</span></Link>
    </div>
  </aside>;
}
