import { useState } from 'react';
import { Eye } from 'lucide-react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  source?: string;
  license?: string;
  credit?: string;
  aspect?: string;
  bare?: boolean;
};

export function EntityMedia({src, alt, className='', caption, source, license, credit, aspect='16 / 9', bare=false}:Props){
  const [failed,setFailed]=useState(false);
  if(failed && bare) return <div className={`visual-fallback ${className}`} role="img" aria-label={`${alt} — imagem indisponível`}><Eye size={22}/><span>Imagem indisponível</span></div>;
  if(bare) return <img src={src} alt={alt} loading="lazy" decoding="async" onError={()=>setFailed(true)} className={className}/>;
  if(failed) return <figure className={`entity-media entity-media-failed ${className}`} style={{aspectRatio:aspect}} aria-label={`${alt} — imagem indisponível`}><Eye size={22}/><figcaption>Imagem indisponível{source?` · fonte: ${source}`:''}</figcaption></figure>;
  return <figure className={`entity-media ${className}`}>
    <div className="entity-media-frame" style={{aspectRatio:aspect}}>
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={()=>setFailed(true)} />
    </div>
    {(caption||source||license||credit)&&<figcaption className="entity-media-meta">
      {caption&&<span>{caption}</span>}
      {(source||credit||license)&&<small>{[credit,source,license].filter(Boolean).join(' · ')}</small>}
    </figcaption>}
  </figure>;
}
