// ============================================================================
//  CLINIC CONFIG  ·  This is the ONLY file you edit to spin up a new demo.
//  Change the values below, drop new images in /public/images, and the whole
//  site updates. Target: a personalised demo in under 90 minutes.
// ============================================================================

export const clinic = {
  // --- Identity -------------------------------------------------------------
  name: "Dental Designs",
  shortName: "Dental Designs",
  tagline: "Caring your 32s — implant, laser & cosmetic dentistry in Vijay Nagar, Indore",
  establishedYear: 2009,
  logo: "/images/dd-logo.png",

  // --- Theme (recolours the entire site) ------------------------------------
  // Use "R G B" space-separated values (no commas, no #).
  theme: {
    brand: "18 120 190", // sky blue from the Dental Designs logo bubble
    brandDark: "11 72 118",
    brandTint: "226 241 251", // pale sky for section backgrounds
    accent: "238 128 62", // warm orange for CTAs (contrasts the blue)
    ink: "18 30 44", // near-black body text (logo lettering)
    paper: "250 252 253", // crisp clinical white
  },

  // --- Contact --------------------------------------------------------------
  phone: "+919321732524", // tel: link (no spaces)
  phoneDisplay: "+91 93217 32524",
  whatsapp: "919321732524", // wa.me number (country code, no +)
  email: "shubham.nagar2001@gmail.com",

  address: {
    line1: "Shop 7, Ivory Square, Plot 22, Scheme No. 78",
    line2: "Near Vijay Nagar Square, Indore, MP 452010",
    // Paste the clinic's embed src from Google Maps > Share > Embed a map.
    mapEmbedSrc:
      "https://www.google.com/maps?q=Scheme+No+78+Vijay+Nagar+Indore+452010&output=embed",
    googleMapsUrl:
      "https://maps.google.com/?q=Scheme+No+78+Vijay+Nagar+Indore+452010",
  },

  hours: [
    { days: "Mon – Sat", time: "10:00 AM – 2:00 PM · 5:00 PM – 9:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  // --- Hero -----------------------------------------------------------------
  hero: {
    eyebrow: "Implant & Laser Centre · Vijay Nagar, Indore",
    headline: "Designing healthy, confident smiles since 2009.",
    sub: "Dr. Arjun Malhotra (MDS, Prosthodontist & Implantologist) and Dr. Ananya Malhotra treat Indore families with compassion, using the most advanced and accurate technology available.",
    image: "/images/ai-dentist.png",
    imagePosition: "73% center", // crop focus — doctor sits right of centre in this photo
    // Name card on the hero photo — the doctor shown in `image`
    imageDoctorName: "Dr. Ananya Malhotra",
    imageDoctorRole: "Cosmetic & General Dentist",
    rating: "4.9 / 5",
    ratingNote: "90 Google reviews",
    trustChips: ["MDS Prosthodontist", "Invisalign Provider", "Laser Dentistry"],
  },

  // --- Clinic photo (used in the About section) ----------------------------
  clinicImage: "/images/ai-dentist.png",

  // --- Stats (animated counters) -------------------------------------------
  stats: [
    { value: 15, suffix: "+", label: "Years of experience" },
    { value: 600, suffix: "+", label: "Patient stories" },
    { value: 31, suffix: "", label: "Treatments offered" },
    { value: 4.9, suffix: "★", label: "Google rating", decimals: 1 },
  ],

  // --- Services background (stays fixed while the cards scroll over it) -----
  servicesBg: "/images/dd-clinic-interior.webp",

  // --- Services (icon keys must match the map in components/icons.ts) -------
  services: [
    {
      icon: "implant",
      title: "Dental Implants",
      desc: "Fixed, natural-looking replacements for missing teeth, planned by an MDS prosthodontist & implantologist.",
      image: "/images/dental-implant.jpeg",
    },
    {
      icon: "root",
      title: "Root Canal Treatment",
      desc: "Comfortable RCT that saves infected teeth — one of our most-requested treatments.",
      image: "/images/root-canal.jpg",
    },
    {
      icon: "crown",
      title: "Crowns, Bridges & Veneers",
      desc: "Ceramic crowns, bridges and laminates crafted with a prosthodontist's eye for fit and shade.",
      image: "/images/cowns-bridges.jpg",
    },
    {
      icon: "braces",
      title: "Invisalign & Braces",
      desc: "Certified Invisalign provider, plus conventional braces to straighten teeth at any age.",
      image: "/images/braces.jpg",
    },
    {
      icon: "whitening",
      title: "Laser Teeth Whitening",
      desc: "In-office laser whitening and bleaching for a visibly brighter smile in a single visit.",
      image: "/images/teeth-whitening.jpg",
    },
    {
      icon: "smile",
      title: "Smile Makeovers",
      desc: "Laminates, reshaping and cosmetic dentistry to redesign your smile from the ground up.",
      image: "/images/smile-makeover.png",
    },
    {
      icon: "denture",
      title: "BPS & Implant Dentures",
      desc: "Precision BPS dentures and implant-supported options for a secure, comfortable fit.",
      image: "/images/dentures.jpg",
    },
    {
      icon: "kids",
      title: "Kids & Special-Needs Care",
      desc: "Patient, gentle dentistry for children — including children with special needs.",
      image: "/images/kids-dentist.jpeg",
    },
    {
      icon: "surgery",
      title: "Extractions & Oral Surgery",
      desc: "Surgical and wisdom tooth extractions, laser gum treatment and minor oral surgery.",
      image: "/images/wisdom.png",
    },
  ],

  whyChooseUs: [
    {
      icon: "badge",
      title: "Specialist-Led Care",
      desc: "Led by an MDS prosthodontist & implantologist with 15+ years of experience.",
    },
    {
      icon: "laser",
      title: "Implant & Laser Centre",
      desc: "Laser dentistry, digital X-rays and modern implant systems under one roof.",
    },
    {
      icon: "shield",
      title: "Strict Hygiene Protocols",
      desc: "Patients consistently praise our clean clinic and rigorous sterilisation SOPs.",
    },
    {
      icon: "feather",
      title: "Gentle with Anxious Patients",
      desc: "We explain every step patiently — families have trusted us for over 15 years.",
    },
  ],

  doctors: [
    {
      name: "Dr. Arjun Malhotra",
      role: "Prosthodontist & Implantologist",
      creds: "BDS, MDS (Prosthodontics, Crown & Bridge) · Modern Dental College, Indore · 15+ yrs",
      photo: "/images/ai-dentist-male.png",
      photoPosition: "73% center", // crop focus — doctor sits right of centre in this photo
    },
    {
      name: "Dr. Ananya Malhotra",
      role: "Cosmetic & General Dentist",
      creds: "BDS · 17+ years of experience",
      photo: "/images/ai-dentist.png",
      photoPosition: "73% center", // crop focus — doctor sits right of centre in this photo
    },
  ],

  // --- Before & After -------------------------------------------------------
  // Per case, set before + after for the drag slider, OR combined for one
  // side-by-side image. Leave all three empty to show a 'coming soon' slot.
  // sample: true marks a stand-in photo (shows a 'Sample' tag and its credit)
  // — replace with the clinic's own consented cases before going live.
  beforeAfter: {
    eyebrow: "Before & after",
    title: "Smiles we've transformed",
    sub: "Drag the slider to compare. Every case is treated and photographed at Dental Designs.",
    sampleSub: "Drag the slider to compare the before and after.",
    cases: [
      {
        label: "Smile makeover",
        treatment: "Ceramic veneers",
        before: "/images/results/smile-makeover-before.jpg",
        after: "/images/results/smile-makeover-after.jpg",
        combined: "",
        sample: true,
        credit: "Yvul, CC BY-SA 4.0, via Wikimedia Commons",
      },
      {
        label: "Teeth alignment",
        treatment: "Orthodontic braces",
        before: "/images/results/teeth-alignment-before.jpg",
        after: "/images/results/teeth-alignment-after.jpg",
        combined: "",
        sample: true,
        credit: "Jeffrey Dorfman, CC BY-SA 3.0, via Wikimedia Commons",
      },
      {
        label: "Gum treatment",
        treatment: "Scaling & gum care",
        before: "/images/results/gum-treatment-before.jpg",
        after: "/images/results/gum-treatment-after.jpg",
        combined: "",
        sample: true,
        credit: "Public domain (CC0), via Wikimedia Commons",
      },
    ],
  },

  // --- Gallery --------------------------------------------------------------
  // Use { photo } for a clinic tour, { combined } for a side-by-side
  // before/after image, or { before, after } for the interactive slider.
  galleryIntro: {
    navLabel: "Clinic Tour",
    eyebrow: "Inside Dental Designs",
    title: "A clinic designed around your comfort",
    sub: "Bright, spotless treatment rooms and a calm waiting lounge in Vijay Nagar.",
  },
  gallery: [
    { photo: "/images/dd-operatory-1.jpg", label: "Treatment room" },
    { photo: "/images/dd-operatory-2.jpg", label: "Modern dental chair" },
    { photo: "/images/dd-operatory-3.jpg", label: "Sterile operatory" },
    { photo: "/images/dd-consult-room.jpg", label: "Consultation room" },
    { photo: "/images/dd-cabin.jpg", label: "Doctor's cabin" },
    { photo: "/images/dd-reception.jpg", label: "Reception & waiting lounge" },
  ] as Array<
    | { photo: string; label: string }
    | { combined: string; label: string }
    | { before: string; after: string; label: string }
  >,

  // --- CTA banner (cut-out doctor photo + booking button) ----------------
  // Use a transparent cut-out PNG so the doctor rises above the card.
  ctaBanner: {
    title: "Let's design your best smile",
    sub: "Specialists in Dental Implants, Invisalign, Cosmetic Dentistry & painless Laser RCT.",
    image: "/images/dr-ananya-cutout.png",
    imageAlt: "Dr. Ananya Malhotra",
  },

  // --- Booking pop-up (opens once per visit after the user starts scrolling)
  bookingPopup: {
    enabled: true,
    openDelayMs: 1500, // opens this long after every page load
    eyebrow: "Limited slots this week",
    title: "Book your smile check-up",
    sub: "Pick a treatment and time — we'll confirm on WhatsApp within minutes.",
    image: "/images/dr-ananya-cutout.png", // transparent cut-out works best
    imageAlt: "Dr. Ananya Malhotra",
    doctorName: "Dr. Ananya Malhotra",
    doctorRole: "Cosmetic & General Dentist",
    perks: ["Consultation ₹400", "No waiting", "Digital X-rays"],
    closedDays: [0], // 0 = Sunday … 6 = Saturday
    slots: [
      { label: "Morning", time: "10 AM – 2 PM" },
      { label: "Evening", time: "5 PM – 9 PM" },
    ],
  },

  // Real Google reviews. `photo`: the reviewer's own profile photo (e.g.
  // /images/reviews/ankur.jpg), used only with their permission. Leave it
  // empty to show their initial instead — never use a stand-in face.
  testimonials: [
    {
      name: "Ankur Totala",
      text: "I have been going for my dental treatment at this clinic for a long time for root canal and implant related work and am very happy with the outcome. Dr. Arjun and Dr. Ananya are excellent with their work and always provide a good consultation for any issues. Highly recommend them.",
      rating: 5,
      photo: "",
    },
    {
      name: "Navid Quraishi",
      text: "I've recently had two root canals and am about to go for an implant — their professionalism and care throughout my treatments has been nothing short of amazing and accommodating towards me. Highly recommend you to trust your oral healthcare to this practice!",
      rating: 5,
      photo: "",
    },
    {
      name: "Anushree Verma",
      text: "The doctors are very friendly and they patiently understand problems. I recommend this place for even kids as they made my 4 year old son very comfortable during his checkup. My treatment was done with utmost patience and hygiene.",
      rating: 5,
      photo: "",
    },
    {
      name: "Karan Jain",
      text: "Dr. Arjun provides exceptional dental care with a gentle and professional approach. The friendly staff and a comfortable environment further enhance the overall experience. Highly recommended for anyone seeking top-notch dental services.",
      rating: 5,
      photo: "",
    },
    {
      name: "Shilpa Patel",
      text: "We have been associated with Sir and Madam for 15 years; their treatment has always been excellent, and special-needs children also receive very good care.",
      rating: 5,
      photo: "",
    },
    {
      name: "Anjali Rathore",
      text: "Visited the clinic for teeth cleaning... very satisfied with the hygiene and treatment of both the doctors. Will definitely recommend.",
      rating: 5,
      photo: "",
    },
  ],

  faqs: [
    {
      q: "What is the consultation fee?",
      a: "Consultation is ₹400. After examining you, we share a clear treatment plan and cost estimate before starting any work.",
    },
    {
      q: "What are your clinic timings?",
      a: "We are open Monday to Saturday in two slots — 10:00 AM to 2:00 PM and 5:00 PM to 9:00 PM. The clinic is closed on Sundays.",
    },
    {
      q: "Do you place dental implants?",
      a: "Yes. Dental Designs is an Implant & Laser Centre, and implants are planned and placed by Dr. Arjun Malhotra, an MDS prosthodontist and implantologist.",
    },
    {
      q: "Do you offer invisible aligners?",
      a: "Yes — we are an Invisalign provider. We also offer conventional braces depending on your needs and budget.",
    },
    {
      q: "Do you treat children, including children with special needs?",
      a: "Absolutely. Our doctors are known for their patience with young children and special-needs patients, and we take extra time to keep them comfortable.",
    },
    {
      q: "Where exactly is the clinic?",
      a: "Shop 7, Ivory Square, Plot 22, Scheme No. 78 — near Vijay Nagar Square, Indore.",
    },
  ],
};

export type Clinic = typeof clinic;
