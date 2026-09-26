export type PoolItem = { id:string; type:string; subject?:string; tags?:string[]; weight?:number };
export type RotationState = { servedIds:string[]; recentByType:Record<string,string[]> };

function score(item:PoolItem, state:RotationState, day:number){
  const served = state.servedIds.includes(item.id);
  const recent = state.recentByType[item.type]?.includes(item.id);
  const novelty = served ? 0 : 1;
  const antiRepeat = recent ? -1 : 0;
  const stable = (((day + item.id.length * 17) % 97) / 97) * 0.05;
  return novelty * 2 + antiRepeat + (item.weight ?? 1) * .15 + stable;
}

export function selectDailyEditorial(pool:PoolItem[], state:RotationState, daySeed:number, count=6){
  return [...pool].sort((a,b)=>score(b,state,daySeed)-score(a,state,daySeed)).slice(0,count);
}

export function buildNotificationSchedule(){
  return [
    {key:'mission',label:'Missão do dia',defaultTime:'08:00',type:'study'},
    {key:'math',label:'Conta do dia',defaultTime:'10:30',type:'math'},
    {key:'physics',label:'Física em movimento',defaultTime:'14:00',type:'physics'},
    {key:'portuguese',label:'Português do dia',defaultTime:'16:30',type:'portuguese'},
    {key:'english',label:'English of the day',defaultTime:'18:00',type:'english'},
    {key:'verse',label:'Versículo do dia',defaultTime:'20:00',type:'bible'},
    {key:'review',label:'Revisão',defaultTime:'21:00',type:'review'},
  ];
}
