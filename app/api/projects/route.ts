import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: "active" },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}