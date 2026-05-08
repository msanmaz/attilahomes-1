import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const path = body.path as string;

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  revalidatePath("/");
  revalidatePath("/properties");
  return NextResponse.json({ revalidated: true, path: "all" });
}
