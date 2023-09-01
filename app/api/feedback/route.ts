import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, message } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    await prismadb.feedback.create({
      data: { name: name, message: message },
    });

    return NextResponse.json("Analysis Done");
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
