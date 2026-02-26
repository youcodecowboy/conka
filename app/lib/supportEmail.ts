/**
 * Single source of truth for customer support / sales contact email.
 * Use SUPPORT_EMAIL for display text and supportMailtoHref() for mailto links.
 */
export const SUPPORT_EMAIL = "sales@conka.io";

export function supportMailtoHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const { subject, body } = options ?? {};
  const url = new URL(`mailto:${SUPPORT_EMAIL}`);
  if (subject) url.searchParams.set("subject", subject);
  if (body) url.searchParams.set("body", body);
  return url.toString();
}
