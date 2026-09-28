export const examEditions = [
  {
    id:'cfs-2-2027',
    label:'CFS 2 2027',
    course:'Curso de Formação de Sargentos da Aeronáutica',
    examDate:'2026-11-22T00:00:00-03:00',
    inscriptionStart:'2026-06-11T10:00:00-03:00',
    inscriptionEnd:'2026-07-02T15:00:00-03:00',
    fee:'R$ 100,00',
    source:'https://ingresso.eear.fab.mil.br/?concurso=CFS+2+2027',
    status:'inscricoes-encerradas-prova-futura',
    note:'A página oficial da EEAR informa inscrições de 11/06/2026 a 02/07/2026 e provas escritas em 22/11/2026. Consulte a fonte oficial para alterações.'
  },
  {
    id:'cfs-1-2027',
    label:'CFS 1 2027',
    course:'Curso de Formação de Sargentos da Aeronáutica',
    examDate:'2026-05-31T00:00:00-03:00',
    inscriptionStart:'2026-02-13T10:00:00-03:00',
    inscriptionEnd:'2026-03-06T15:00:00-03:00',
    fee:'R$ 100,00',
    source:'https://ingresso.eear.fab.mil.br/?concurso=CFS+1+2027',
    status:'encerrada',
    note:'Edição oficial já realizada; mantida como histórico de referência. A fonte oficial permanece como referência de verdade.'
  },
] as const;
export const officialEearSource='https://www.fab.mil.br/admissao/militares-de-carreira/eear/';

export const editorialSubjects = [
  {id:'portugues',name:'Português',image:'/assets/subjects/portugues.svg',topics:['interpretação','gramática','sintaxe','concordância','regência','crase','semântica','ortografia','figuras de linguagem','formação de palavras']},
  {id:'ingles',name:'Inglês',image:'/assets/subjects/ingles.svg',topics:['reading','vocabulário','tempos verbais','pronomes','determinantes','modais','voz passiva','discurso indireto','conectivos','preposições']},
  {id:'matematica',name:'Matemática',image:'/assets/subjects/matematica.svg',topics:['álgebra','geometria plana','trigonometria','álgebra avançada','estatística','geometria espacial','analítica']},
  {id:'fisica',name:'Física',image:'/assets/subjects/fisica.svg',topics:['fundamentos','mecânica','gravitação','fluidos','calor','termodinâmica','ondas','óptica','eletricidade','eletromagnetismo','radiação']},
] as const;
