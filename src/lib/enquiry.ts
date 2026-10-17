/** Enquiry form schema — shared by the client form and the /api/enquiry route. */

export const materialOptions = [
  { value: "marble", label: "Marble" },
  { value: "italian-marble", label: "Italian Marble" },
  { value: "granite", label: "Granite" },
  { value: "tiles", label: "Tiles" },
  { value: "kota-stone", label: "Kota Stone" },
  { value: "not-sure", label: "Not sure yet — need advice" },
] as const;

export const projectTypes = [
  "New home",
  "Renovation",
  "Kitchen",
  "Bathroom",
  "Flooring",
  "Commercial / office",
  "Hospitality / retail",
  "Outdoor / landscape",
  "Other",
] as const;

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  material: string;
  projectType: string;
  quantity: string;
  location: string;
  requirements: string;
  product: string;
  /** Honeypot — must stay empty. */
  company: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry: EnquiryInput = {
  name: "",
  phone: "",
  email: "",
  material: "",
  projectType: "",
  quantity: "",
  location: "",
  requirements: "",
  product: "",
  company: "",
};

const LIMITS: Record<keyof EnquiryInput, number> = {
  name: 80,
  phone: 24,
  email: 120,
  material: 40,
  projectType: 40,
  quantity: 80,
  location: 120,
  requirements: 2000,
  product: 120,
  company: 120,
};

/** Trim every field and clamp to its maximum length. Unknown keys are dropped. */
export function normalise(raw: Partial<Record<string, unknown>>): EnquiryInput {
  const out = { ...emptyEnquiry };
  for (const key of Object.keys(emptyEnquiry) as (keyof EnquiryInput)[]) {
    const v = raw[key];
    out[key] = typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
  }
  return out;
}

export function validate(input: EnquiryInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.name.length < 2) e.name = "Please enter your full name.";
  const digits = input.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Please enter a phone number so we can reach you.";
  else if (!/^[+\d][\d\s()-]*$/.test(input.phone) || digits.length < 7 || digits.length > 15)
    e.phone = "That phone number doesn't look right — include the area or country code.";
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) e.email = "Please enter a valid email address, or leave it blank.";
  if (!materialOptions.some((m) => m.value === input.material)) e.material = "Choose the material you're interested in.";
  if (!projectTypes.includes(input.projectType as (typeof projectTypes)[number])) e.projectType = "Choose a project type.";
  if (input.requirements.length < 10) e.requirements = "Tell us a little about your project (at least 10 characters).";
  return e;
}

export const materialLabel = (value: string) => materialOptions.find((m) => m.value === value)?.label ?? value;

/** Plain-text summary used for WhatsApp / email hand-off. */
export function enquirySummary(i: EnquiryInput) {
  return [
    `Enquiry from ${i.name}`,
    `Phone: ${i.phone}`,
    i.email ? `Email: ${i.email}` : null,
    `Material: ${materialLabel(i.material)}`,
    i.product ? `Product: ${i.product}` : null,
    `Project: ${i.projectType}`,
    i.quantity ? `Quantity: ${i.quantity}` : null,
    i.location ? `Location: ${i.location}` : null,
    "",
    i.requirements,
  ]
    .filter((l) => l !== null)
    .join("\n");
}
