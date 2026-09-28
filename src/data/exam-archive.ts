export type PreviousExam = {
  id: string;
  edition: string;
  year: number;
  code: string;
  option?: string;
  status: 'official_answer_key' | 'provisional_answer_key' | 'archive_reference';
  officialUrl: string;
  archiveUrl: string;
  sourceName: string;
  rightsStatus: 'official_external_source';
  notes: string;
};

const archiveUrl = 'https://ingresso.eear.fab.mil.br/SOO/home/provas_anteriores.php?sigla_conc=%25';
const sourceName = 'Sistema de Gerenciamento e Controle de Exames Militares — EEAR/FAB';
const official = (id:string, edition:string, year:number, code:string, officialUrl:string, option?:string):PreviousExam => ({id,edition,year,code,option,status:'official_answer_key',officialUrl,archiveUrl,sourceName,rightsStatus:'official_external_source',notes:'Gabarito oficial diretamente identificado na fonte institucional.'});
const reference = (edition:string, year:number, code:string):PreviousExam => ({id:`${edition.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${code}`,edition,year,code,status:'archive_reference',officialUrl:archiveUrl,archiveUrl,sourceName,rightsStatus:'official_external_source',notes:'Código e divulgação catalogados a partir do arquivo oficial; a prova/gabarito permanece hospedada pela EEAR.'});

export const previousExamArchiveUrl = archiveUrl;

const base = 'https://ingresso.eear.fab.mil.br/SOO/escolaridade';
const pdf=(path:string)=>`${base}/${path}`;

export const previousExamCatalog: PreviousExam[] = [
  official('cfs1-2026-40','CFS 1/2026',2026,'40',pdf('CFS%201%202026/prova_cfs%201%202026_cod_40.pdf?concurso=CFS+1+2026'),'01'),
  official('cfs1-2026-42','CFS 1/2026',2026,'42',pdf('CFS%201%202026/prova_cfs%201%202026_cod_42.pdf?concurso=CFS+1+2026'),'01'),
  official('cfs1-2026-44','CFS 1/2026',2026,'44',pdf('CFS%201%202026/prova_cfs%201%202026_cod_44.pdf?concurso=CFS+1+2026'),'01'),
  official('cfs1-2026-81','CFS 1/2026',2026,'81',pdf('CFS%201%202026/prova_cfs%201%202026_cod_81.pdf?concurso=CFS+1+2026'),'02'),
  official('cfs1-2026-83','CFS 1/2026',2026,'83',pdf('CFS%201%202026/prova_cfs%201%202026_cod_83.pdf?concurso=CFS+1+2026'),'02'),
  official('cfs1-2026-85','CFS 1/2026',2026,'85',pdf('CFS%201%202026/prova_cfs%201%202026_cod_85.pdf?concurso=CFS+1+2026'),'02'),
  official('cfs1-2025-62','CFS 1/2025',2025,'62',pdf('CFS%201%202025/prova_cfs%201%202025_cod_62_29%2007%202024%2008%2054.pdf?concurso=CFS+1+2025'),'01'),
  official('cfs1-2025-64','CFS 1/2025',2025,'64',pdf('CFS%201%202025/prova_cfs%201%202025_cod_64_29%2007%202024%2008%2026%2004.pdf?concurso=CFS+1+2025'),'01'),
  official('cfs1-2025-66','CFS 1/2025',2025,'66',pdf('CFS%201%202025/prova_cfs%201%202025_cod_66_29%2007%202024%2008%2026%2013.pdf?concurso=CFS+1+2025'),'01'),
  official('cfs2-2025-98','CFS 2/2025',2025,'98',pdf('CFS%202%202025/prova_cfs%202%202025_cod_98.pdf?concurso=CFS+2+2025'),'02'),
  reference('CFS 1/2024',2024,'02'),reference('CFS 1/2024',2024,'04'),reference('CFS 1/2024',2024,'06'),
  reference('CFS 2/2024',2024,'14'),reference('CFS 2/2024',2024,'16'),reference('CFS 2/2024',2024,'18'),reference('CFS 2/2024',2024,'43'),reference('CFS 2/2024',2024,'45'),reference('CFS 2/2024',2024,'47'),
  reference('CFS 2/2023',2023,'88'),reference('CFS 2/2023',2023,'84'),reference('CFS 2/2023',2023,'80'),reference('CFS 2/2023',2023,'65'),reference('CFS 2/2023',2023,'61'),reference('CFS 2/2023',2023,'63'),
  reference('CFS 1/2023',2023,'96'),reference('CFS 1/2023',2023,'94'),reference('CFS 1/2023',2023,'92'),reference('CFS 1/2023',2023,'83'),reference('CFS 1/2023',2023,'85'),reference('CFS 1/2023',2023,'81'),
  reference('CFS 1/2022',2022,'05'),reference('CFS 1/2022',2022,'11'),reference('CFS 1/2022',2022,'17'),reference('CFS 1/2022',2022,'42'),reference('CFS 1/2022',2022,'52'),reference('CFS 1/2022',2022,'62'),
  reference('CFS 2/2022',2022,'01'),reference('CFS 2/2022',2022,'06'),reference('CFS 2/2022',2022,'26'),reference('CFS 2/2022',2022,'46'),reference('CFS 2/2022',2022,'51'),reference('CFS 2/2022',2022,'91'),
  reference('CFS 1/2021',2021,'33'),reference('CFS 1/2021',2021,'35'),reference('CFS 1/2021',2021,'37'),reference('CFS 1/2021',2021,'65'),reference('CFS 1/2021',2021,'67'),reference('CFS 1/2021',2021,'69'),
  reference('CFS 2/2021',2021,'41'),reference('CFS 2/2021',2021,'43'),reference('CFS 2/2021',2021,'45'),reference('CFS 2/2021',2021,'73'),reference('CFS 2/2021',2021,'75'),reference('CFS 2/2021',2021,'77'),
  reference('CFS 1/2020',2020,'12'),reference('CFS 1/2020',2020,'14'),reference('CFS 1/2020',2020,'16'),
  reference('CFS 2/2020',2020,'21'),reference('CFS 2/2020',2020,'23'),reference('CFS 2/2020',2020,'25'),
  reference('CFS 2/2020 BCT',2020,'52'),reference('CFS 2/2020 BCT',2020,'54'),reference('CFS 2/2020 BCT',2020,'56'),
];
