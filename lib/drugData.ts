export interface CardData {
  id: string
  year: number
  scientist: string
  discovery: string
  flavour: string
}

export const timelineEvents: CardData[] = [
  {
    id: 'semmelweis',
    year: 1847,
    scientist: 'Ignaz Semmelweis',
    discovery: 'Handwashing reduces childbed fever',
    flavour: '"Wash your hands! The doctors themselves were carrying death from the morgue to the maternity ward."',
  },
  {
    id: 'snow',
    year: 1854,
    scientist: 'John Snow',
    discovery: 'Removed the Broad Street pump handle',
    flavour: 'He mapped cholera cases in Soho and convinced the council to remove the pump handle — ending the outbreak.',
  },
  {
    id: 'pasteur',
    year: 1859,
    scientist: 'Louis Pasteur',
    discovery: 'Swan-neck flask experiment disproved spontaneous generation',
    flavour: 'Boiled broth in a swan-neck flask remained sterile — proving that microbes come from the air, not nothingness.',
  },
  {
    id: 'lister',
    year: 1867,
    scientist: 'Joseph Lister',
    discovery: 'Antiseptic surgery using carbolic acid',
    flavour: 'He sprayed carbolic acid on surgical wounds, instruments, and even the air in the operating theatre.',
  },
  {
    id: 'koch',
    year: 1884,
    scientist: 'Robert Koch',
    discovery: 'Koch\'s postulates — linking specific germs to specific diseases',
    flavour: 'Four rules to prove a bacterium causes a disease — the foundation of medical microbiology.',
  },
  {
    id: 'fleming',
    year: 1928,
    scientist: 'Alexander Fleming',
    discovery: 'Discovered penicillin — the first antibiotic',
    flavour: 'A forgotten petri dish revealed mould killing bacteria. "That\'s funny," he said, and changed medicine forever.',
  },
]

export interface DrugPreset {
  name: string
  ec50: number
  hill: number
}

export const drugPresets: DrugPreset[] = [
  { name: 'Aspirin', ec50: 10, hill: 1.5 },
  { name: 'Morphine', ec50: 5, hill: 2.0 },
  { name: 'Penicillin', ec50: 2, hill: 1.2 },
]

export interface Patient {
  name: string
  age: number
  condition: string
  ec50Multiplier: number
}

const conditions = ['Post-surgery infection', 'Chronic pain', 'Fever and inflammation']
const names = ['Eleanor Whitmore', 'Thomas Briggs', 'Mary Seacole', 'James Finch', 'Ada Lovelace']

export function generatePatient(drug: DrugPreset): Patient {
  const name = names[Math.floor(Math.random() * names.length)]
  const age = Math.floor(Math.random() * 40) + 20
  const condition = conditions[Math.floor(Math.random() * conditions.length)]
  const ec50Multiplier = 0.9 + Math.random() * 0.2
  return { name, age, condition, ec50Multiplier }
}

export const concentrations = [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10, 20, 50, 100]

export interface Pathogen {
  id: string
  name: string
  historicalQuote: string
  scientist: string
  discoveryYear: number
  funFact: string
}

export const pathogens: Pathogen[] = [
  {
    id: 'cholera',
    name: 'Vibrio cholerae (Cholera)',
    historicalQuote: '"I saw innumerable minute organisms darting about with great rapidity." — Filippo Pacini, 1854',
    scientist: 'Filippo Pacini',
    discoveryYear: 1854,
    funFact: 'Pacini discovered V. cholerae in the gut of cholera patients decades before it was widely accepted. John Snow\'s epidemiology and Pacini\'s microscopy together told the full story.',
  },
  {
    id: 'influenza',
    name: 'Influenza Virus',
    historicalQuote: '"The disease sweeps through populations like a wildfire, leaving none untouched." — Victorian physician, 1889 pandemic',
    scientist: 'Multiple scientists',
    discoveryYear: 1933,
    funFact: 'The 1918 flu pandemic killed more people than World War I. The virus was first isolated in 1933, but its RNA genome was not sequenced until 1995.',
  },
  {
    id: 'malaria',
    name: 'Plasmodium (Malaria Parasite)',
    historicalQuote: '"I have found the parasite! It lies within the red corpuscles of the blood." — Charles Louis Alphonse Laveran, 1880',
    scientist: 'Charles Laveran',
    discoveryYear: 1880,
    funFact: 'Laveran won the Nobel Prize in 1907 for discovering that malaria is caused by a protozoan parasite — not a bacterium or virus. It was the first time a protozoan was linked to human disease.',
  },
  {
    id: 'tb',
    name: 'Mycobacterium tuberculosis (Tuberculosis)',
    historicalQuote: '"The tubercle bacillus is the cause of consumption. It is an acid-fast rod, slow-growing and tenacious." — Robert Koch, 1882',
    scientist: 'Robert Koch',
    discoveryYear: 1882,
    funFact: 'TB was called "consumption" because it seemed to consume people from within. Koch announced his discovery of the bacillus at a famous lecture in Berlin in 1882 — a landmark moment in germ theory.',
  },
]

export const multipleChoiceOptions: string[] = [
  'Vibrio cholerae (Cholera bacterium)',
  'Influenza virus',
  'Plasmodium (Malaria parasite)',
  'Mycobacterium tuberculosis (TB bacillus)',
]
