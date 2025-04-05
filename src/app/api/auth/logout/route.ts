import { createClient } from '@/utils/supabase/server'
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const {error} = await supabase.auth.signOut();

  if(error){
    return NextResponse.json({
      message: "Server encountered an error"
    }, {
      status: 500
    })
  }

  return NextResponse.json({
    message: "Success"
  }, {
    status: 200
  })

}
