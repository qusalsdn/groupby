import { Group } from "@/app/create/page";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: Group = await request.json();
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}
