/* Site-level configuration. NOT content — content lives in collections and is
 * client-editable YAML frontmatter. This is wiring, plus the short client
 * strings every direction shares.
 *
 * Source of truth for every client string below: the founder's own rebuild
 * at gatewaytohealth.com (Oct 2026) and the product pages it links to. Where a
 * line is lifted verbatim it says so; where we condensed, it says that too. */

export const BRAND = {
  name: 'Gateway to Health',
  short: 'Gateway',
  /* Her og:description, verbatim. */
  line: 'Oral + gut health, in one connected conversation.',
  /* Her footer line, verbatim. */
  tagline: 'Connected testing, guidance & education',
  /* Her hero, verbatim. */
  headline: 'Feel better. Start upstream.',
} as const;

/* Every outbound link the pages use. Checkout and programmes stay on her
 * platforms — this site never takes payment. */
export const LINKS = {
  testKits: 'https://shop.theurbanmonk.com/collections/test-kit',
  guided: 'https://www.gatewaytohealth.com/resource_redirect/landing_pages/2151556923',
  upstream: 'https://shop.theurbanmonk.com/products/upstream-the-complete-microbiome-solution',
  watch: 'https://theurbanmonk.com/films-and-series/',
  gutCheck: 'https://theacademy.theurbanmonk.com/gut-check',
  affiliate: 'https://theurbanmonkstore.bixgrow.com/',
  partner: 'mailto:support@theurbanmonk.com?subject=Gateway%20Practitioner%20Partnership',
  privacy: 'https://theurbanmonk.com/privacy-policy/',
  terms: 'https://theurbanmonk.com/terms-of-service/',
} as const;

/* ------------------------------------------------------------------ people --
 * Her About page lists two founders, three oral health experts and twelve
 * health coaches. Bios are hers, verbatim or lightly trimmed. Photos are
 * copied locally into /public/img/gateway/team so the build does not depend
 * on her storage URLs staying put. */
export type Person = {
  name: string;
  short?: string;
  credential: string;
  role: string;
  focus: string;
  bio?: string;
  photo?: string;
};

export const FOUNDERS: Person[] = [
  {
    name: 'Dr. Elmira Gederi Shojai',
    short: 'Dr. Elmira Shojai',
    credential: 'DDS',
    role: 'Founder',
    focus: 'Functional dentistry and oral microbiome science',
    bio: 'Dr. Elmira Shojai brings more than 18 years of hands-on clinical experience in functional dentistry and oral microbiome science. A University of the Pacific graduate, she spent over a decade in active California practice before leading Gateway to Health, where she oversees a nationwide network of licensed dentists providing personalized consultations informed by oral microbiome testing. She is also an Executive Producer of the eight-part Gateway to Health docu-series.',
    photo: '/img/gateway/team/elmira-shojai.jpg',
  },
  {
    name: 'Dr. Pedram Shojai',
    short: 'Dr. Pedram Shojai',
    credential: 'OMD',
    role: 'Founder',
    focus: 'Integrative medicine and gut-health programs',
    bio: 'Dr. Pedram Shojai is a Doctor of Oriental Medicine, an early practitioner of integrative medicine, filmmaker, and New York Times bestselling author of The Urban Monk. His career has centered on asking better questions about why people fall ill. At Gateway, he directs gut-health programs and brings a systems-level perspective to the connection between the mouth, the gut, and everyday health.',
    photo: '/img/gateway/team/pedram-shojai.png',
  },
];

export const ORAL_EXPERTS: Person[] = [
  {
    name: 'Lora Hooper',
    credential: 'BSDH, RDH, EFDA',
    role: 'Oral Health Expert',
    focus: 'Salivary diagnostics, precision prevention, and integrative oral-systemic care.',
    photo: '/img/gateway/team/lora-hooper.jpg',
  },
  {
    name: 'Anne Rice',
    credential: 'CDP',
    role: 'Oral Health Expert · Bale/Doneen Method Preceptor',
    focus: 'Oral-systemic health, brain health, dementia prevention, and practical risk awareness.',
    photo: '/img/gateway/team/anne-rice.jpg',
  },
  {
    name: 'Michelle Mahlke',
    credential: 'RDH',
    role: 'Oral Health Expert',
    focus: 'Oral-systemic connection, salivary diagnostics, and patient empowerment.',
    photo: '/img/gateway/team/michelle-mahlke.jpg',
  },
];

export const COACHES: Person[] = [
  { name: 'Courtney Reynolds', credential: 'MPH, FMCHC, NBC-HWC', role: 'Director of Health Coaching', focus: 'Gut health, mindfulness, root-cause healing, and sustainable behavior change.', photo: '/img/gateway/team/courtney-reynolds.jpg' },
  { name: 'Keri Sitrick', credential: 'PCC, NBC-HWC, FMCHC', role: 'Health Coach', focus: 'Evidence-based behavior change, stress resilience, and functional-medicine coaching.', photo: '/img/gateway/team/keri-sitrick.jpg' },
  { name: 'Caroline Wilson', credential: 'M.Ed, FMCHC', role: 'Health Coach', focus: 'Breathwork, nervous-system awareness, and whole-person health habits.', photo: '/img/gateway/team/caroline-wilson.jpg' },
  { name: 'Sheetal Kapani', credential: 'FMCHC, NBC-HWC', role: 'Health Coach', focus: 'Gut-health support, energy, mood, digestion, and sustainable daily habits.', photo: '/img/gateway/team/sheetal-kapani.jpg' },
  { name: 'Alexandria Larsen', credential: 'FMCHC, NBC-HWC', role: 'Health Coach', focus: 'Nutrition, nervous-system health, and realistic whole-person lifestyle change.', photo: '/img/gateway/team/alexandria-larsen.jpg' },
  { name: 'Sheida Johnson', credential: 'FMCHC, NBC-HWC, B.S.', role: 'Health Coach', focus: 'Gut health, functional nutrition, and practical wellness guidance.', photo: '/img/gateway/team/sheida-johnson.jpg' },
  { name: 'Kristin Schupp', credential: 'NBC-HWC', role: 'Health Coach', focus: 'Dietetics-informed nutrition, lifestyle support, and women’s functional health.', photo: '/img/gateway/team/kristin-schupp.jpg' },
  { name: 'Elaine Hyman', credential: 'FMCHT, UKIHCA-RHC', role: 'Health Coach', focus: 'Root-cause health coaching and personalized everyday lifestyle change.', photo: '/img/gateway/team/elaine-hyman.jpg' },
  { name: 'Kimberly Beaugrand', credential: 'RN(BScN), FMCHC, FDN-P', role: 'Health Coach', focus: 'Gut-focused functional diagnostic nutrition and root-cause wellness.', photo: '/img/gateway/team/kimberly-beaugrand.jpg' },
  { name: 'Kathleen Donhardt', credential: 'Certified Eating Psychology & Mind Body Nutrition Coach', role: 'Health Coach', focus: 'Eating psychology, mind-body nutrition, and resilient lifestyle habits.', photo: '/img/gateway/team/kathleen-donhardt.jpg' },
  { name: 'Deanna Clauson', credential: 'NBC-HWC, FMCHC', role: 'Health Coach', focus: 'Gut health, HeartMath, and turning complex information into practical next steps.', photo: '/img/gateway/team/deanna-clauson.jpg' },
  { name: 'Sarah Besocke', credential: 'MA, INHC', role: 'Health Coach', focus: 'Gut health, sleep, food-as-medicine, and clear guidance around health information.', photo: '/img/gateway/team/sarah-besocke.jpg' },
];

/* The three names every homepage leads with. Kept as named keys because the
 * direction components address them individually. */
export const PRACTITIONERS = {
  dental: FOUNDERS[0],
  medical: FOUNDERS[1],
  hygiene: ORAL_EXPERTS[0],
} as const;

/* Her About page's section intros, verbatim. */
export const TEAM_GROUPS = [
  {
    id: 'founders',
    eyebrow: 'Leadership & clinical perspective',
    title: 'Meet the Gateway team.',
    intro: 'We bring distinct backgrounds to one shared point of view: good health questions require context, care, and a willingness to look beyond isolated symptoms.',
    people: FOUNDERS,
  },
  {
    id: 'oral',
    eyebrow: 'Salivary diagnostics & oral-systemic care',
    title: 'Meet our oral health experts.',
    intro: 'Our oral health team integrates salivary diagnostics and collaborative oral-systemic care to support a more connected health conversation.',
    people: ORAL_EXPERTS,
  },
  {
    id: 'coaches',
    eyebrow: 'Guidance & practical support',
    title: 'Meet our health coaching team.',
    intro: 'Our credentialed health coaches help people turn information into realistic next steps, with a whole-person perspective on the habits that shape daily health.',
    people: COACHES,
  },
] as const;

/* Post-nominals, expanded once wherever a page sets them as marks. */
export const CREDENTIALS = [
  { mark: 'DDS', expansion: 'Doctor of Dental Surgery' },
  { mark: 'OMD', expansion: 'Doctor of Oriental Medicine' },
  { mark: 'BSDH, RDH, EFDA', expansion: 'Bachelor of Science in Dental Hygiene; Registered Dental Hygienist; Expanded Functions Dental Assistant' },
  { mark: 'CDP', expansion: 'Certified Dementia Practitioner' },
  { mark: 'RDH', expansion: 'Registered Dental Hygienist' },
];

/* ------------------------------------------------------------- disclaimers -- */
/* The long form, from the original site. Still hers; not ours to soften. */
export const DISCLAIMER =
  'The information on this site is for educational purposes only and should not be construed as medical advice. Readers are advised to consult a qualified professional about any issue regarding their health and well-being.';
/* The short form from her new footer, verbatim. */
export const DISCLAIMER_SHORT = 'Educational purpose only. Not medical advice.';

export const TESTIMONIALS = [
  { quote: 'My brain fog is gone and I am feeling energy again.', who: 'Tina A.' },
  { quote: 'My canker sores are no longer bothering me and my gums are not bleeding anymore.', who: 'Brian V.' },
  { quote: 'My gas and bloating are all but gone and my sleep is greatly improved.', who: 'Vivian K.' },
] as const;

/* The plain-language spine every direction must hit above the fold, in this
 * order, before any term of art appears. The "don't make me think" contract
 * as an object rather than as a note in a doc nobody opens.
 *
 * Rewritten for the Gateway positioning: oral AND gut, three ways in, not one
 * saliva test. Every clause is hers, condensed from her hero and proof band. */
export const ORIENTATION = {
  what: 'Low energy, poor sleep, digestive discomfort and inflammation can have connected drivers — and the mouth and gut are part of the same conversation.',
  do: 'Choose testing, guided support, or a self-directed plan built around where you are now.',
  get: 'A clearer picture of what may be shaping how you feel, so you can choose your next step with more confidence.',
  then_the_term:
    'Clinicians call the living ecosystem in your mouth the oral microbiome. Our oral test is called Orobiome.',
} as const;

/* Her proof band, verbatim. */
export const PROOF = [
  { title: 'When you don’t feel like yourself, start looking upstream.', body: 'Low energy, poor sleep, digestive discomfort, and persistent inflammation can have interconnected drivers.' },
  { title: 'The mouth and gut are part of the same conversation.', body: 'Your oral microbiome, gut lining, and gut microbiome can influence the signals your body is sending.' },
  { title: 'Get a clearer next step.', body: 'Choose testing, guided support, or a self-directed plan built around where you are now.' },
] as const;

/* Her "Why start here" section, verbatim. */
export const WHY_UPSTREAM = {
  eyebrow: 'Why start here',
  title: 'When your body feels off, the answer may not be where you expect.',
  lead: 'You may be dealing with fatigue, restless sleep, digestive symptoms, brain fog, or inflammation, and still not have a clear explanation. Gateway looks upstream at the oral microbiome, gut lining, and gut microbiome to reveal patterns that single-system approaches can miss.',
  points: [
    { title: 'Your mouth is more than the beginning of digestion.', body: 'The oral microbiome is a living ecosystem. When it is out of balance, it may affect more than your teeth and gums. It can become part of your larger health story.' },
    { title: 'Your gut needs more than another supplement.', body: 'The gut lining and microbiome help shape digestion, immune activity, energy, and resilience. Understanding the context can help you make more informed choices.' },
    { title: 'Stop guessing at what your body needs.', body: 'Gateway brings oral and gut insight together, then gives you a practical path: testing, guided support, or a structured self-directed system.' },
  ],
} as const;

/* ------------------------------------------------------------------- paths --
 * Her "Choose your starting point" cards, verbatim. The three ways in. */
export const PATHS_INTRO = {
  eyebrow: 'Choose your starting point',
  title: 'Start where you are. Go where you need to.',
  lead: 'Whether you want data, more personalized guidance, or a practical plan you can follow on your own, Gateway gives you a way forward.',
} as const;

export const PATHS = [
  {
    id: 'data',
    title: 'Get the data behind how you feel.',
    body: 'Shop oral, gut, sleep, or paired test kits designed to make hidden patterns more visible.',
    cta: 'Shop test kits',
    href: LINKS.testKits,
    note: 'Four kits, from $399',
  },
  {
    id: 'guided',
    title: 'Get support turning insight into change.',
    body: 'For those who want personalized interpretation, clinician-led guidance, and a more supported plan.',
    cta: 'Explore guided support',
    href: LINKS.guided,
    note: 'Clinician-led',
  },
  {
    id: 'upstream',
    title: 'Take a practical reset at your own pace.',
    body: 'Upstream is a six-week self-guided system for the mouth, gut lining, microbiome, toxic load, and nervous-system patterns.',
    cta: 'Explore Upstream',
    href: LINKS.upstream,
    note: '6 weeks · $499',
  },
] as const;

/* Upstream, from its product page. A real strict-superset upgrade exists here
 * (Upstream → Upstream Bundle), quoted rather than invented. */
export const UPSTREAM = {
  name: 'Upstream',
  price: 499,
  weeks: [
    { n: 'W1', title: 'Go Upstream — Identify Your True Source' },
    { n: 'W2', title: 'Clear the Path — Reduce Toxic Load' },
    { n: 'W3', title: 'Heal the Lining — Restore Gut Integrity' },
    { n: 'W4', title: 'Rebuild the Ecosystem — Microbiome Restoration' },
    { n: 'W5', title: 'Activate the Vagus — Calm the Nervous System' },
    { n: 'W6', title: 'Lock It In — Build Your Resilience Protocol' },
  ],
  bundle: 'The Upstream Bundle ($599) adds a clinical-grade gut microbiome test kit and a 1-on-1 Concierge Strategy Session with a certified health coach.',
} as const;

/* ------------------------------------------------------------------ series -- */
export const SERIES = [
  {
    id: 'gateway',
    name: 'Gateway to Health',
    subtitle: 'Healing Secrets of the Oral Biome',
    meta: '8 episodes · Oral-systemic health',
    body: 'This documentary series begins with an overlooked truth: the mouth is not separate from the rest of you. Each episode makes the oral–systemic connection easier to understand, so you can bring better questions to your health decisions.',
    cta: 'Watch the series',
    href: LINKS.watch,
    poster: '/img/gateway/series/gateway-to-health.webp',
  },
  {
    id: 'interconnected',
    name: 'Interconnected',
    subtitle: 'Everyone is talking about the gut. Don’t skip the mouth.',
    meta: '10-part gut health docuseries',
    body: 'Interconnected is a powerful introduction to the microbiome and the daily choices that can support it. Gateway brings forward the part of that conversation that is too often missed: your mouth is the beginning of the digestive tract, and its living ecosystem is part of the larger picture.',
    cta: 'Explore Interconnected',
    href: LINKS.watch,
    poster: '/img/gateway/series/interconnected.webp',
  },
  {
    id: 'gutcheck',
    name: 'GutCheck',
    subtitle: 'Get curious about your gut health.',
    meta: 'Gut health series',
    body: 'GutCheck is a practical entry point for understanding the gut microbiome and the everyday choices that shape it. Explore food, movement, and lifestyle through a clearer, more connected lens.',
    cta: 'Explore GutCheck',
    href: LINKS.gutCheck,
    poster: '/img/gateway/series/gutcheck.webp',
  },
] as const;

export const SERIES_INTRO = {
  eyebrow: 'The series',
  title: 'Stories that help you see the whole system.',
  lead: 'Thoughtful, expert-led series for anyone who wants to understand how the mouth, gut, nervous system, and everyday life shape one another.',
} as const;

/* ----------------------------------------------------------- practitioners --
 * Her "For practitioners" page, verbatim. */
export const PRACTITIONER_PAGE = {
  eyebrow: 'For practitioners',
  title: 'A wider lens for the patient in front of you.',
  lead: 'Gateway gives dentists and aligned practitioners a clearer way to introduce oral–gut context, practical testing pathways, and consumer resources that support the whole health conversation.',
  context: {
    eyebrow: 'A considered extension',
    title: 'Better patient conversations start with a broader context.',
    body: 'For patients navigating fatigue, sleep disruption, digestive concerns, brain fog, or inflammation, the mouth may be an important part of the story. Gateway offers a consumer-facing path that helps them explore that connection without making the clinical relationship feel fragmented.',
  },
  affiliate: {
    eyebrow: 'Gateway affiliate program',
    title: 'Make the connection. Keep the relationship.',
    body: 'Gateway gives dental and aligned practitioners a simple way to introduce oral-systemic testing while patients receive clear education, consultation, and next-step guidance.',
    steps: [
      { title: 'Join and share', body: 'Sign up as an affiliate and share your dedicated testing link with patients who may benefit from a broader oral-systemic picture.' },
      { title: 'Gateway guides the next step', body: 'We schedule the patient consultation, review results, answer questions, and provide a clear treatment guide.' },
      { title: 'Stay connected to care', body: 'Patients return to you for their ongoing oral treatment, keeping the patient relationship and referral loop connected.' },
    ],
    cta: 'Apply to become an affiliate',
  },
  benefits: [
    { title: 'Introduce a connected lens.', body: 'Give patients a simple, credible language for understanding why oral and gut health may belong in the same conversation.' },
    { title: 'Offer a next step beyond the chair.', body: 'Point patients toward consumer testing, guided support, or self-directed education when their health questions extend beyond a single appointment.' },
    { title: 'Stay connected to the outcome.', body: 'Build a more coherent patient journey while Gateway supports the education and lifestyle side of the wider system.' },
  ],
  close: {
    eyebrow: 'Partnerships',
    title: 'Interested in bringing Gateway into your practice?',
    body: 'We are building relationships with dentists and aligned practitioners who want to help patients see a more complete health picture.',
    cta: 'Start a conversation',
  },
} as const;

/* ------------------------------------------------------------- start guide --
 * Her /start guide: four questions, then a recommendation. Questions, choices
 * and every result's copy are hers, verbatim.
 *
 * Routing — what we observed on her live guide: answering every question
 * with the first choice routes by focus to a test kit; all-second routes to
 * guided support; all-third routes to Upstream. Her rule for MIXED answers is
 * not visible from outside, so ours is an inference: the path chosen most
 * often across Q1–Q3 wins, and a tie goes to the Q2 answer ("How would you
 * like to begin?"). Flag before launch. */
export type StartPath = 'data' | 'guided' | 'upstream';
export type StartFocus = 'oral' | 'gut' | 'sleep' | 'connection';

export const START_GUIDE = {
  intro: {
    eyebrow: 'Gateway starting point',
    title: 'A clearer place to begin.',
    lead: 'This short guide does not diagnose or replace medical care. It simply helps you choose a Gateway path that best matches the support you are looking for.',
    note: 'About 90 seconds · Educational guidance only',
  },
  questions: [
    {
      id: 'q1',
      prompt: 'What would feel most useful right now?',
      help: 'There is no wrong answer. Choose the place that feels closest to where you are.',
      choices: [
        { value: 'data', label: 'A clearer picture', detail: 'I want data that can help me understand what may be shaping how I feel.' },
        { value: 'guided', label: 'More personalized support', detail: 'I want help connecting the dots and deciding what to do next.' },
        { value: 'upstream', label: 'A practical reset', detail: 'I want a structured way to start making changes at my own pace.' },
      ],
    },
    {
      id: 'q2',
      prompt: 'How would you like to begin?',
      help: 'Choose the level of support that feels most realistic for your life right now.',
      choices: [
        { value: 'data', label: 'Start with testing', detail: 'I would rather begin with oral, gut, or paired data.' },
        { value: 'guided', label: 'Work with guidance', detail: 'I would value interpretation and a more supported next step.' },
        { value: 'upstream', label: 'Work through a system', detail: 'I am ready for a self-guided, step-by-step protocol.' },
      ],
    },
    {
      id: 'q3',
      prompt: 'What kind of next step feels right?',
      help: 'Gateway can meet you with data, a supported path, or tools to begin on your own.',
      choices: [
        { value: 'data', label: 'Understand the pattern', detail: 'I want to explore the mouth–gut information behind my questions.' },
        { value: 'guided', label: 'Turn insight into change', detail: 'I want a more personalized plan and support along the way.' },
        { value: 'upstream', label: 'Build new daily practices', detail: 'I want practical education and routines I can apply myself.' },
      ],
    },
    {
      id: 'q4',
      prompt: 'Where would you like to put the first spotlight?',
      help: 'This helps tailor your starting point. It is not a diagnosis or a substitute for clinical care.',
      choices: [
        { value: 'oral', label: 'Oral health', detail: 'I am curious whether the mouth and oral microbiome may be part of my larger health story.' },
        { value: 'gut', label: 'Gut health', detail: 'I want to better understand digestion, gut resilience, and the gut microbiome.' },
        { value: 'sleep', label: 'Sleep + recovery', detail: 'I want to explore persistent sleep difficulties and the patterns that may be worth discussing.' },
        { value: 'connection', label: 'The mouth–gut connection', detail: 'I want to explore how oral and gut health may belong in the same conversation.' },
      ],
    },
  ],
  focusLabel: {
    oral: 'oral health',
    gut: 'gut health',
    sleep: 'sleep and recovery',
    connection: 'the mouth–gut connection',
  } as Record<StartFocus, string>,
  results: {
    data: {
      oral: {
        title: 'Start with an oral-health lens.',
        body: 'An oral microbiome test may be a useful place to begin when you want to better understand oral-health patterns and how they may fit into your larger health story.',
        why: 'You chose a clearer picture and an oral-health focus. Starting with oral microbiome information can help you move from uncertainty to a more informed next step.',
        cta: 'Explore OroBiome testing',
        href: 'https://shop.theurbanmonk.com/products/orobiome-testing-package',
      },
      gut: {
        title: 'Start with a gut-health lens.',
        body: 'A gut-focused test may be a useful place to begin when you want to better understand food-related and gut-health patterns worth discussing next.',
        why: 'You chose a clearer picture and a gut-health focus. Starting with gut-related information can help you move from uncertainty to a more informed next step.',
        cta: 'Explore gut testing',
        href: 'https://shop.theurbanmonk.com/products/kbmo-fit-22-gut-permeability-test-kit-with-consultation',
      },
      sleep: {
        title: 'Start with a sleep-health lens.',
        body: 'A sleep-focused test may be a useful place to begin when persistent sleep difficulties are the pattern you most want to explore.',
        why: 'You chose a clearer picture and a sleep-and-recovery focus. Starting with sleep-related information can help you move from uncertainty to a more informed next step.',
        cta: 'Explore Deep Sleep Testing',
        href: 'https://shop.theurbanmonk.com/products/dss-testing-tier-dss-entry',
      },
      connection: {
        title: 'Start with the complete oral + gut picture.',
        body: 'The complete testing package may be the most useful place to begin when you want to explore oral and gut patterns together. It starts the key tests in parallel instead of sequencing separate steps.',
        why: 'You chose a clearer picture and the mouth–gut connection. This complete path brings oral microbiome, food-sensitivity, and deep gut testing together up front; most people can complete all three collections in the same week.',
        cta: 'Explore complete oral + gut testing',
        href: 'https://shop.theurbanmonk.com/products/explore-testing-tier-complete-package',
      },
    },
    guided: {
      title: 'Start with guided support.',
      body: 'A more supported path may be the right fit when you want help connecting oral and gut insights with a clearer, more personalized direction.',
      why: 'Your answers suggest that interpretation and ongoing support would be especially valuable at this stage.',
      cta: 'Explore guided support',
      href: LINKS.guided,
    },
    upstream: {
      title: 'Start with Upstream.',
      body: 'Upstream may be the right fit when you are ready for a practical, self-guided six-week system to work at your own pace.',
      why: 'Your answers suggest that a structured educational protocol and daily practices are the most useful place to begin.',
      cta: 'Explore Upstream',
      href: LINKS.upstream,
    },
  },
  disclaimer: 'This recommendation is educational and is not medical advice or a diagnosis. Consult an appropriate health professional for individual medical concerns.',
} as const;

/* ------------------------------------------------------------------ labels -- */
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

export type DirectionSlug = (typeof DIRECTIONS)[number]['slug'];

/* The secondary pages every direction carries, in nav order. Each direction
 * renders them at /<direction>/<page> in its own chrome. */
export const SUBPAGES = [
  { slug: 'start', label: 'Find your starting point' },
  { slug: 'about', label: 'About us' },
  { slug: 'series', label: 'The series' },
  { slug: 'practitioners', label: 'For practitioners' },
] as const;
