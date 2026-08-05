import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "فایلی ارسال نشد." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `listings/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from("market")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from("market").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}