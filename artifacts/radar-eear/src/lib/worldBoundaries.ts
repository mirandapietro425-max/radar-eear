
export type GeoJSONGeometry =
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] }
  | { type: 'MultiLineString'; coordinates: number[][][] }
  | { type: 'LineString'; coordinates: number[][] };
export type GeoJSONFeature = { type:'Feature'; properties?: Record<string, any>; geometry: GeoJSONGeometry|null };
export type GeoJSONFeatureCollection = { type:'FeatureCollection'; features: GeoJSONFeature[] };

const URLS = [
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson',
];
let cache: Promise<GeoJSONFeatureCollection|null>|null = null;
export function loadWorldBoundaries(){
  if(cache) return cache;
  cache = (async()=>{
    for(const url of URLS){
      try{
        const res=await fetch(url,{mode:'cors',credentials:'omit'});
        if(!res.ok) continue;
        const data=await res.json();
        if(data?.type==='FeatureCollection') return data as GeoJSONFeatureCollection;
      }catch{}
    }
    return null;
  })();
  return cache;
}
