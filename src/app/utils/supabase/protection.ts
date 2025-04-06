"use server"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";


const manualProtect = async () => {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/auth/login/')
    }
}

export default manualProtect