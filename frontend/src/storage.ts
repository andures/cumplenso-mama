import { supabase } from "./supabase";
import type { Attendee } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToAttendee(row: any): Attendee {
  return {
    id: row.id as string,
    name: row.name as string,
    phone: (row.phone as string | null) ?? undefined,
    companions: (row.companions as number) ?? 0,
    message: (row.message as string | null) ?? undefined,
    createdAt: row.created_at as string,
  };
}

export async function getAttendees(): Promise<Attendee[]> {
  const { data, error } = await supabase
    .from("attendees")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("getAttendees:", error);
    return [];
  }
  return (data ?? []).map(rowToAttendee);
}

export async function addAttendee(
  attendee: Omit<Attendee, "id" | "createdAt">,
): Promise<Attendee> {
  const { data, error } = await supabase
    .from("attendees")
    .insert({
      name: attendee.name,
      phone: attendee.phone || null,
      companions: attendee.companions,
      message: attendee.message || null,
    })
    .select()
    .single();
  if (error) throw error;
  return rowToAttendee(data);
}

export async function updateAttendee(
  id: string,
  fields: { name: string; phone?: string; companions: number },
): Promise<Attendee> {
  const { data, error } = await supabase
    .from("attendees")
    .update({
      name: fields.name,
      phone: fields.phone || null,
      companions: fields.companions,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return rowToAttendee(data);
}

export async function deleteAttendee(id: string): Promise<void> {
  const { error } = await supabase.from("attendees").delete().eq("id", id);
  if (error) throw error;
}
