/* Site-level configuration. NOT content — content lives in collections and is
 * client-editable YAML frontmatter. This is wiring. */

export const PRACTITIONERS = {
  dental: {
    name: 'Dr. Elmira Gederi Shojai',
    short: 'Dr. Elmira Shojai',
    credential: 'DDS',
    role: 'Chief of Dental Programs',
    focus: 'Functional and oro-systemic dentistry',
  },
  medical: {
    name: 'Dr. Pedram Shojai',
    short: 'Dr. Pedram Shojai',
    credential: 'OMD',
    role: 'Director of Gut Health Programs',
    focus: 'Functional medicine; NYT bestselling author and filmmaker',
  },
  hygiene: {
    name: 'Lora Hooper',
    short: 'Lora Hooper',
    credential: 'BSDH, RDH, EFDA',
    role: 'Consulting Oral Microbiome Specialist',
    focus: 'Clinical oral microbiome practice',
  },
} as const;

/* Lifted verbatim from the live site. Not ours to soften. */
export const DISCLAIMER =
  'The information on this site is for educational purposes only and should not be construed as medical advice. Readers are advised to consult a qualified professional about any issue regarding their health and well-being.';

export const TESTIMONIALS = [
  { quote: 'My brain fog is gone and I am feeling energy again.', who: 'Tina A.' },
  { quote: 'My canker sores are no longer bothering me and my gums are not bleeding anymore.', who: 'Brian V.' },
  { quote: 'My gas and bloating are all but gone and my sleep is greatly improved.', who: 'Vivian K.' },
] as const;

/* The plain-language spine every direction must hit above the fold, in this
 * order, before any term of art appears. The "don't make me think" contract
 * as an object rather than as a note in a doc nobody opens. */
export const ORIENTATION = {
  what: 'Your mouth is full of bacteria. Some protect you; some quietly make you ill.',
  do: 'Spit in a tube at home and mail it back.',
  get: 'A report naming which bacteria you have, and a dentist who explains what to do about it.',
  then_the_term:
    'Clinicians call that ecosystem the oral microbiome. We call the test the Orobiome panel.',
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  'oral-health': 'Mouth',
  'gut-health': 'Gut',
  'hormone-health': 'Hormones',
  'brain-health': 'Brain',
};

export const DIRECTIONS = [
  { slug: 'journal', name: 'Journal', mode: 'light' },
  { slug: 'atlas', name: 'Atlas', mode: 'dark' },
  { slug: 'practice', name: 'Practice', mode: 'light' },
] as const;
