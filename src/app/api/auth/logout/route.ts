import { createClient } from '@/utils/supabase/server'
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const {error} = await supabase.auth.signOut();

  return NextResponse.redirect("/"); // Redirect to home or login page
}
