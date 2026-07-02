export type CountryCode = { code: string; label: string };

// Philippines listed first since it's the default for AKT's phone fields.
export const countryCodes: CountryCode[] = [
  { code: "+63", label: "Philippines (+63)" },
  { code: "+1", label: "US / Canada (+1)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+91", label: "India (+91)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+852", label: "Hong Kong (+852)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+82", label: "South Korea (+82)" },
  { code: "+86", label: "China (+86)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+353", label: "Ireland (+353)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+52", label: "Mexico (+52)" },
  { code: "+55", label: "Brazil (+55)" },
];

/**
 * Combines a country code with a locally-entered number into E.164 format
 * (e.g. "+63" + "09934798997" -> "+639934798997"). Strips everything but
 * digits from the local number and drops a single leading trunk "0".
 */
export function toE164(countryCode: string, localNumber: string): string {
  const digitsOnly = localNumber.replace(/\D/g, "").replace(/^0+/, "");
  return digitsOnly ? `${countryCode}${digitsOnly}` : "";
}

export const E164_RE = /^\+[1-9]\d{6,14}$/;
