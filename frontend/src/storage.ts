import type { Attendee } from "./types";

const STORAGE_KEY = "cumple_abuela_attendees";

export function getAttendees(): Attendee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attendee[]) : [];
  } catch {
    return [];
  }
}

export function addAttendee(
  attendee: Omit<Attendee, "id" | "createdAt">,
): Attendee {
  const all = getAttendees();
  const newEntry: Attendee = {
    ...attendee,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  all.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return newEntry;
}
