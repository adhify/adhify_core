export default function toValidDomainLabel(input: string): string {
  try {
    const url = new URL(input);
    input = url.hostname; // extract just the hostname
  } catch {
    // If not a full URL, keep input as-is
  }

  return input
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-') // allow dots (.) and hyphens (-)
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
    .replace(/--+/g, '-') // collapse multiple hyphens
    .replace(/\.\.+/g, '.'); // collapse multiple dots (optional, for safety)
}
