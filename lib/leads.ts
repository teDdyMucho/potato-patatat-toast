import type { Lead } from "@/lib/types/admin";

/** Raw shape of a public.leads row. */
export type LeadRow = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  need: string | null;
  message: string;
  contact_time: string | null;
  status: Lead["status"];
  notes: string;
  created_at: string;
};

export const LEAD_COLUMNS =
  "id, name, company, email, phone, need, message, contact_time, status, notes, created_at";

export function rowToLead(r: LeadRow): Lead {
  return {
    id: r.id,
    name: r.name,
    company: r.company,
    email: r.email,
    phone: r.phone,
    need: r.need,
    message: r.message,
    contactTime: r.contact_time,
    status: r.status,
    notes: r.notes,
    createdAt: r.created_at,
  };
}
