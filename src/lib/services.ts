export interface Service {
  slug: string;
  title: string;
  short: string;
  overview: string;
  scope: string[];
  process: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "dental",
    title: "Dental & Oral Health",
    short: "Implants, smile design, and oral surgery.",
    overview:
      "Comprehensive dental care delivered by Türkiye's leading specialists — from single-tooth implants to full-mouth restorations, executed in clinics equipped to international standards. Every plan begins with a remote consultation and ends with discreet follow-up wherever you reside.",
    scope: [
      "Dental implants and All-on-4/6 restorations",
      "Smile design and cosmetic dentistry",
      "Oral surgery, including bone grafting and sinus lift",
      "Endodontics, orthodontics, and prosthetics",
      "Pediatric and special-needs dentistry",
    ],
    process: [
      { title: "Remote assessment", body: "We review your radiographs and history before recommending an approach." },
      { title: "Treatment plan", body: "A staged plan with clinical and aesthetic outcomes is prepared for your approval." },
      { title: "Travel & treatment", body: "Your visit is arranged end-to-end; the clinical work is delivered in concentrated sessions." },
      { title: "Aftercare", body: "Follow-up reviews are coordinated remotely; corrections, if any, are scheduled with care." },
    ],
    faqs: [
      { q: "How long does a typical treatment take?", a: "Most implant cases are completed in two visits over four to six months. Cosmetic work can often be finalized in a single visit." },
      { q: "Are the materials internationally certified?", a: "Yes. We work only with implant systems and prosthetic materials certified to EU and US standards." },
      { q: "Is sedation available?", a: "Conscious sedation and full anesthesia are available where clinically indicated and at your request." },
    ],
  },
  {
    slug: "plastic",
    title: "Plastic & Aesthetic Surgery",
    short: "Facial, body, and restorative aesthetic procedures.",
    overview:
      "From restorative reconstruction to refined aesthetic refinement, the surgeons in our network operate with discretion and precision. Cases are reviewed individually; nothing is promised that the anatomy will not support, and nothing is recommended that the patient does not actively seek.",
    scope: [
      "Facial procedures: rhinoplasty, facelift, blepharoplasty",
      "Body contouring: liposuction, abdominoplasty, brachioplasty",
      "Breast surgery: augmentation, reduction, mastopexy, reconstruction",
      "Restorative and post-oncology procedures",
      "Non-surgical refinements: filler, neuromodulators, laser",
    ],
    process: [
      { title: "Confidential consultation", body: "A private conversation establishes your priorities and clinical context." },
      { title: "Surgical plan", body: "Photographs and measurements are reviewed; a plan with realistic outcomes is shared." },
      { title: "Surgery & recovery", body: "Procedures are performed in accredited theatres; recovery is supervised in private suites." },
      { title: "Long-term follow-up", body: "Follow-up reviews extend across the first year to confirm stable, healthy results." },
    ],
    faqs: [
      { q: "How is privacy protected?", a: "Records are accessed only by your treating team. Discretion at every encounter is a baseline standard, not an upgrade." },
      { q: "Where is the surgery performed?", a: "In private hospitals accredited to JCI standards or equivalent, with experienced anaesthesia teams." },
      { q: "What is the typical recovery time?", a: "Most patients are travel-ready within seven to fourteen days, depending on the procedure. A detailed timeline is prepared for each case." },
    ],
  },
  {
    slug: "bariatric",
    title: "Bariatric Surgery",
    short: "Sleeve gastrectomy, bypass, and metabolic surgery.",
    overview:
      "Bariatric and metabolic surgery delivered by experienced teams whose work has been recognized internationally. Candidacy is assessed strictly; the surgical option is offered only when it is the right answer for the patient.",
    scope: [
      "Sleeve gastrectomy (LSG)",
      "Roux-en-Y gastric bypass (RYGB)",
      "Single anastomosis bypass (mini bypass)",
      "Duodenal switch and SADI",
      "Revisional bariatric surgery",
    ],
    process: [
      { title: "Eligibility review", body: "Body composition, metabolic markers, and psychological readiness are evaluated together." },
      { title: "Multidisciplinary planning", body: "Surgeon, dietitian, psychologist, and anaesthesia team review your case before approval." },
      { title: "Procedure", body: "Surgery is performed laparoscopically in accredited centres; hospital stay is typically two to three nights." },
      { title: "Nutritional follow-up", body: "Structured follow-up over the first year, coordinated with a clinician local to you where possible." },
    ],
    faqs: [
      { q: "How much weight loss can I expect?", a: "Outcomes vary by procedure and adherence. Realistic expectations are set during the assessment, not at the consultation." },
      { q: "What is the role of GLP-1 medications?", a: "Where appropriate, medical therapy is offered as an alternative or adjunct. Surgery is not recommended for patients who have not first received an honest evaluation of non-surgical options." },
      { q: "How long is the hospital stay?", a: "Two to three nights in hospital, followed by a recovery period in your accommodation under our coordination." },
    ],
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    short: "Joint, spine, and sports injury surgery.",
    overview:
      "Joint replacement, spine surgery, and sports medicine delivered by surgeons with international training and large operative volumes. Conservative options are exhausted before surgery is considered; when surgery is chosen, it is planned with the same care.",
    scope: [
      "Hip and knee replacement (primary and revision)",
      "Spine surgery, including minimally invasive decompression",
      "Sports medicine: ACL reconstruction, shoulder, arthroscopy",
      "Foot and ankle surgery",
      "Paediatric and complex deformity surgery",
    ],
    process: [
      { title: "Imaging review", body: "Recent imaging is reviewed and supplemented if necessary before any recommendation." },
      { title: "Surgical plan", body: "Implant choice, technique, and expected recovery curve are documented and discussed." },
      { title: "Surgery & rehabilitation", body: "Surgery is followed by structured in-patient rehabilitation; physiotherapy continues at your hotel." },
      { title: "Return-to-life", body: "Activity restoration is monitored remotely with your local physiotherapist where helpful." },
    ],
    faqs: [
      { q: "What implants are used?", a: "Implants from leading manufacturers (Zimmer Biomet, Stryker, DePuy Synthes) are selected per case, not per contract." },
      { q: "How soon can I fly home?", a: "For most joint replacements, ten to fourteen days. Compression and prophylaxis are coordinated with your travel." },
      { q: "Is physiotherapy included?", a: "In-patient and early out-patient physiotherapy are coordinated as part of the plan. Continued therapy is arranged with you for home." },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
